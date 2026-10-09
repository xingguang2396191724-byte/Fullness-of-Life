from pathlib import Path
import re

VERSION = "20261009-3"
changed = []

for path in Path(".").rglob("*.html"):
    if ".git" in path.parts:
        continue
    old = path.read_text(encoding="utf-8")
    new = old
    new = re.sub(r'((?:href)=["\'][^"\']*assets/site\.css)(?:\?[^"\']*)?(["\'])',
                 rf'\1?v={VERSION}\2', new)
    new = re.sub(r'(src=["\'][^"\']*assets/site\.js)(?:\?[^"\']*)?(["\'])',
                 rf'\1?v={VERSION}\2', new)
    new = re.sub(r'(href=["\'][^"\']*assets/technical-specs/[^"\']+\.pdf)(?:\?[^"\']*)?(["\'])',
                 rf'\1?v={VERSION}\2', new)
    # Bust cache for every product image reference, including relative paths.
    new = re.sub(r'((?:src|data-src)=["\'][^"\']*assets/products/[^"\']+\.(?:webp|png|jpe?g|avif))\?[^"\']*(["\'])',
                 rf'\1\2', new, flags=re.IGNORECASE)
    new = re.sub(r'((?:src|data-src)=["\'][^"\']*assets/products/[^"\']+\.(?:webp|png|jpe?g|avif))(["\'])',
                 rf'\1?v={VERSION}\2', new, flags=re.IGNORECASE)
    if new != old:
        path.write_text(new, encoding="utf-8")
        changed.append(str(path))

print(f"Cache-busted {len(changed)} HTML files:")
for item in changed:
    print(item)
