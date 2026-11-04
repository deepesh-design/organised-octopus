"""Create a product-organized image library without changing live website paths."""
from pathlib import Path
import json, shutil, csv, hashlib
ROOT=Path.cwd(); DEST=ROOT/'Product Images'
slugs={
'black-gold-chess-trio':'chess-pieces-black-gold','bronze-chess-trio':'chess-pieces-bronze','bronze-monkey-side-table':'bronze-monkey-side-table','butler-bear-side-table':'dab-bear-side-table','elephant-lamp':'elephant-lamp','elephant-wall-planter':'elephant-planter','ember-side-table':'fireplace-side-table','geometric-deer-head':'geometric-deer-head','geometric-dog-side-table':'geometric-dog-side-table','head-case-side-table':'head-side-table','lion-head-wall-mount':'lion-head-wall-mount','nobo-side-stand':'nobo-side-stand','panda-side-table':'panda-side-table','panther-sculpture':'panther-sculpture','pink-elephant-side-table':'pink-elephant-side-table','tree-hugger-side-table':'tree-hugger-side-table','visor-bear-sculpture':'teddy-statue'}
records=[];seen=set();missing=[]
def copy(src,dest,slug,kind):
 src=Path(src)
 if not src.is_file():missing.append(str(src));return
 key=(slug,str(src.resolve()))
 if key in seen:return
 seen.add(key);dest.parent.mkdir(parents=True,exist_ok=True)
 if dest.exists() and dest.read_bytes()!=src.read_bytes():
  dest=dest.with_name(dest.stem+'-'+hashlib.sha256(src.read_bytes()).hexdigest()[:8]+dest.suffix)
 shutil.copy2(src,dest)
 assert hashlib.sha256(src.read_bytes()).digest()==hashlib.sha256(dest.read_bytes()).digest()
 records.append({'product':slug,'group':kind,'file':str(dest.relative_to(DEST)),'source':str(src.resolve()),'bytes':src.stat().st_size})
for src in sorted((ROOT/'assets').rglob('*')):
 if src.suffix.lower() not in {'.png','.jpg','.jpeg','.webp','.avif'}:continue
 slug=next((s for s,a in slugs.items() if src.stem==a or src.stem.startswith(a+'-') or src.stem==s or src.stem.startswith(s+'-') or src.stem.startswith(s+' ')),None)
 if src.name=='wip-elephant-planter.webp':slug='elephant-wall-planter'
 if not slug:continue
 rel=src.relative_to(ROOT/'assets'); page=(ROOT/'pieces'/(slug+'.html')).read_text()
 current=(src.name in page or (src.suffix=='.webp' and src.stem==slugs[slug]))
 kind='Website' if current else 'Extras'
 copy(src,DEST/slug/kind/rel,slug,kind)
for manifest in ['manifest.json','all-generated-versions.json','published-revisions.json','revisions.json','selected-revisions.json']:
 for i in json.loads((ROOT/'output/product-images'/manifest).read_text()):
  slug=i['slug'];src=Path(i['path']);variant=i.get('variant','image')
  copy(src,DEST/slug/'Originals'/('generated-'+variant+src.suffix),slug,'Originals')
copy('/Users/deepeshreddy/Documents/3D Prints/org oc/instagram pictures/Raw/DSCF1280.JPG',DEST/'lion-head-wall-mount'/'Originals'/'DSCF1280.JPG','lion-head-wall-mount','Originals')
DEST.mkdir(exist_ok=True)
with (DEST/'image-index.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=['product','group','file','source','bytes']);w.writeheader();w.writerows(records)
lines=['# Product image library','','Images grouped by catalogue product. These are verified copies; the website continues to use its existing assets paths.','','Each product folder contains:','- Website: current product-gallery images, social previews, and responsive sizes.','- Extras: other project images and superseded web versions.','- Originals: full-resolution generated versions and supplied source photos.','','image-index.csv lists every copied image and its original location. Cinematic and older lifestyle versions are retained as originals, not published.','','## Product counts','']
for slug in slugs:lines.append('- '+slug+': '+str(sum(r['product']==slug for r in records))+' images')
(DEST/'README.md').write_text('\n'.join(lines)+'\n')
print(json.dumps({'products':len(slugs),'images':len(records),'bytes':sum(r['bytes'] for r in records),'missing_sources':sorted(set(missing))},indent=2))
