"""
Tokenise text with GLM-5.3-Flash's real tokenizer.

    python3 -m pip install regex
    curl -sL -o /tmp/tok.json \
      https://huggingface.co/zai-org/GLM-5.3-Flash/resolve/main/tokenizer.json
    python3 scripts/tokenize-glm.py "The dog dropped the ball, and it"

Exists because §2's split and §8's arithmetic were invented, and §8 puts the
product on screen next to countable pieces. `research/glm/TOKENIZER.md` has
the measured results and what they changed.

Byte-level BPE: pre-tokenise with the tokenizer's own regex, map bytes to the
GPT-2 printable range, merge by lowest rank until nothing merges, look up ids.
"""
import json, regex as re2, sys
TOK = sys.argv[1] if sys.argv[1].endswith('.json') else '/tmp/tok.json'
ARGS = sys.argv[2:] if sys.argv[1].endswith('.json') else sys.argv[1:]
D=json.load(open(TOK))
M=D['model']; VOCAB=M['vocab']; MERGES=M['merges']
added={t['content']:t['id'] for t in D.get('added_tokens',[])}
PAT=D['pre_tokenizer']['pretokenizers'][0]['pattern']['Regex']
rx=re2.compile(PAT)

def byte_encoder():
    bs=list(range(ord('!'),ord('~')+1))+list(range(ord('\xa1'),ord('\xac')+1))+list(range(ord('\xae'),ord('\xff')+1))
    cs=bs[:]; n=0
    for b in range(256):
        if b not in bs: bs.append(b); cs.append(256+n); n+=1
    return dict(zip(bs,[chr(c) for c in cs]))
BE=byte_encoder()

rank={}
for i,m in enumerate(MERGES):
    if isinstance(m,str): a,b=m.split(' ',1)
    else: a,b=m[0],m[1]
    rank[(a,b)]=i

def bpe(tok):
    parts=list(tok)
    if len(parts)<2: return parts
    while True:
        best=None;bi=-1
        for i in range(len(parts)-1):
            r=rank.get((parts[i],parts[i+1]))
            if r is not None and (best is None or r<best): best=r; bi=i
        if best is None: break
        parts[bi:bi+2]=[parts[bi]+parts[bi+1]]
    return parts

def encode(text):
    out=[]
    for piece in rx.findall(text):
        enc=''.join(BE[b] for b in piece.encode('utf-8'))
        for t in bpe(enc):
            out.append((t, VOCAB.get(t, added.get(t))))
    return out

for text in ARGS:
    toks=encode(text)
    pretty=[t.replace('Ġ',' ').replace('Ċ','\\n') for t,_ in toks]
    print(f'INPUT : {text!r}')
    print(f'COUNT : {len(toks)}')
    print('TOKENS: ' + ' | '.join(repr(p) for p in pretty))
    print('IDS   : ' + ' '.join(str(i) for _,i in toks))
    print()
