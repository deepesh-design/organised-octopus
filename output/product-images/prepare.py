"""Compress the recorded imagegen outputs and install product galleries."""
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = Path(__file__).with_name('manifest.json')
items = json.loads(MANIFEST.read_text())
gallery = ROOT / 'assets/products/gallery'
gallery.mkdir(parents=True, exist_ok=True)
(gallery / 'sm').mkdir(exist_ok=True)
for item in items:
    name = item['slug'] + '-' + item['variant'] + '.webp'
    for size, directory in [(1200, gallery), (600, gallery / 'sm')]:
        target = directory / name
        if not target.exists():
            with Image.open(item['path']) as source:
                img = source.convert('RGB')
                img.thumbnail((size, size), Image.Resampling.LANCZOS)
                img.save(target, 'WEBP', quality=83, method=6)
    item['web_path'] = 'assets/products/gallery/' + name
    item['web_bytes'] = (gallery / name).stat().st_size

for page in sorted((ROOT / 'pieces').glob('*.html')):
    source = page.read_text()
    match = re.search(r'<img id="piece-img" data-slug="([^"]+)" src="([^"]+)" alt="([^"]+)"[^>]*>', source)
    slug, original, name = match.groups()
    available = {item['variant'] for item in items if item['slug'] == slug}
    if available != {'side', 'closeup', 'lifestyle'}:
        continue
    images = [f'            <img id="piece-img" data-slug="{slug}" src="{original}" alt="{name}" width="1200" height="1200" decoding="async">']
    labels = {'side': 'side angle', 'closeup': 'close-up of surface texture and detail', 'lifestyle': 'styled in a home interior'}
    for variant, label in labels.items():
        file = f'{slug}-{variant}.webp'
        images.append(f'            <img src="./assets/products/gallery/{file}" srcset="./assets/products/gallery/sm/{file} 600w, ./assets/products/gallery/{file} 1200w" sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1440px) 50vw, 700px" alt="{name}, {label}" width="1200" height="1200" loading="lazy" decoding="async">')
    markup = '\n'.join([
        '      <div style="grid-column:1 / 7;">',
        '        <div class="oo-gallery" data-oo-gallery>',
        f'          <div class="oo-gallery__view" tabindex="0" role="region" aria-label="{name} images">',
        *images,
        '          </div>',
        '          <div class="oo-gallery__bar" aria-hidden="true"><span class="oo-gallery__thumb"></span></div>',
        '        </div>',
        '      </div>'])
    start = source.index('      <div style="grid-column:1 / 7;">')
    end = source.index('      <div id="piece-info"', start)
    source = source[:start] + markup + '\n' + source[end:]
    if 'src="./piece-gallery.js' not in source:
        source = source.replace('</body>', '<script src="./piece-gallery.js?v=1"></script>\n</body>')
    page.write_text(source)
MANIFEST.write_text(json.dumps(items, indent=2) + '\n')
print(f'Prepared {len(items)} images; {sum(i["web_bytes"] for i in items):,} bytes at full size')
