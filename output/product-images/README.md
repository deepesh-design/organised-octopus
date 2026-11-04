# Product gallery images

Generated with the built-in imagegen tool from the original product photos on 2026-09-25.

Completed: 48 images for 16 products. Each has a side angle, material close-up, and home lifestyle image. Full-size WebP files are in `assets/products/gallery/`, with 600px alternatives in its `sm/` directory. Full-size files average 102 KB, a 94.6% reduction from the generated PNGs.

`manifest.json` records the exact prompt, original generated PNG path, product slug, variant, deployed asset path and size. `prepare.py` compresses those outputs and installs the galleries.

Visor Bear Sculpture: all three variants were rejected by the image service at output moderation, category `other`, including a retry. Its original product page and image were retained. No substitute images were installed.

Validation: all 16 updated pages have four gallery images and one gallery script; every local image reference resolves; all generated WebP files decode at 1200px and 600px square. Desktop vertical and mobile horizontal scrolling and slider movement were verified in the browser, with no horizontal page overflow.
