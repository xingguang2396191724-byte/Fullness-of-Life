from pathlib import Path
import re
from PIL import Image

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

# Validate every referenced product image path and verify that image files decode.
missing = []
referenced = set()
for path in Path(".").rglob("*.html"):
    if ".git" in path.parts:
        continue
    content = path.read_text(encoding="utf-8")
    for match in re.finditer(r'(?:src|data-src)=["\']([^"\']*assets/products/[^"\']+)["\']', content, re.IGNORECASE):
        rel = match.group(1).split("?", 1)[0]
        marker = "assets/products/"
        idx = rel.lower().find(marker)
        if idx < 0:
            continue
        asset_rel = rel[idx:]
        asset_path = Path(asset_rel)
        if not asset_path.exists():
            # Resolve relative paths from the HTML page directory.
            asset_path = (path.parent / rel).resolve()
        if not asset_path.exists():
            missing.append((str(path), rel))
        else:
            referenced.add(asset_path)

if missing:
    for page, asset in missing:
        print(f"MISSING PRODUCT IMAGE: {page} -> {asset}")
    print(f"Found {len(missing)} missing product image reference(s).")

decode_errors = []
for asset in sorted(referenced):
    try:
        with Image.open(asset) as im:
            im.verify()
    except Exception as exc:
        decode_errors.append((str(asset), str(exc)))

report = ["Product image validation report", f"Referenced files: {len(referenced)}", f"Missing references: {len(missing)}", f"Undecodable images: {len(decode_errors)}", ""]
report.extend(f"MISSING | {page} | {asset}" for page, asset in missing)
report.extend(f"UNDECODABLE | {asset} | {error}" for asset, error in decode_errors)
report.extend(f"OK | {asset}" for asset in sorted(referenced) if all(asset != Path(bad[0]) for bad in decode_errors))
Path("image-validation-report.txt").write_text("\\n".join(report) + "\\n", encoding="utf-8")
print("\\n".join(report))
