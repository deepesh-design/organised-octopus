from pathlib import Path
import csv,subprocess,hashlib
root=Path.cwd(); library=root/'Product Images'
rows=list(csv.DictReader((library/'image-index.csv').open()))
tracked=subprocess.check_output(['git','ls-files'],text=True).splitlines()
# HEAD is the published site; local drafts should not count as live usage.
texts=[]
for f in tracked:
 if Path(f).suffix in {'.html','.js','.css','.json'} and not f.startswith(('output/','Product Images/')):
  texts.append(subprocess.check_output(['git','show','HEAD:'+f],text=True))
site='\n'.join(texts)
plans=[]
for row in rows:
 source=Path(row['source']); old=library/row['file']
 rel=source.relative_to(root).as_posix() if source.is_relative_to(root) else ''
 used=bool(rel.startswith('assets/') and rel in site)
 group='In Website' if used else 'Not in Website'
 name=old.name
 if rel.startswith('assets/'):
  if '/sm/' in rel:name='small--'+name
  elif '/md/' in rel:name='medium--'+name
  elif '/og/' in rel:name='social--'+name
  elif '/process/' in rel:name='process--'+name
 dest=library/row['product']/group/name
 if any(p[1]==dest for p in plans) or (dest.exists() and dest!=old):
  dest=dest.with_name(dest.stem+'--'+hashlib.sha256(str(old).encode()).hexdigest()[:8]+dest.suffix)
 assert old.is_file(),old
 plans.append((old,dest,row,group))
for old,dest,row,group in plans:
 dest.parent.mkdir(parents=True,exist_ok=True);old.rename(dest)
 row['file']=str(dest.relative_to(library));row['group']=group
for product in {r['product'] for r in rows}:
 for group in ['In Website','Not in Website']:(library/product/group).mkdir(exist_ok=True)
for d in sorted(library.rglob('*'),key=lambda x:len(x.parts),reverse=True):
 if d.is_dir() and d.name not in ['In Website','Not in Website'] and not any(d.iterdir()):d.rmdir()
with (library/'image-index.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
(library/'README.md').write_text('''# Product images

Each product has exactly two folders:

- **In Website**: image files referenced by the published website, including responsive sizes and social previews.
- **Not in Website**: unused alternatives, previous versions, and uncompressed source images. A source image may have a compressed version in the website folder.

Small, medium, social and process prefixes identify file purposes. The image-index.csv records each file and its original source. Website assets were not moved or changed.
''')
assert len(rows)==sum(1 for p in library.rglob('*') if p.suffix.lower() in {'.webp','.png','.jpg','.jpeg','.avif'})
print('Products:',len({r['product'] for r in rows}))
for group in ['In Website','Not in Website']:print(group+':',sum(r['group']==group for r in rows))
