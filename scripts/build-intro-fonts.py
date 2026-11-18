# /// script
# requires-python = ">=3.10,<3.14"
# dependencies = ["fonttools==4.59.2", "brotli==1.1.0"]
# ///
"""Build page-specific variable WOFF2 files. Inputs come from Velite."""
import hashlib
import io
import json
import sys
import tempfile
import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


REVISION = "7889f11bf31170b5d092a083b357c8c8130f89e0"
URL = f"https://raw.githubusercontent.com/adobe-fonts/source-han-serif/{REVISION}/Variable/TTF/Subset/SourceHanSerifCN-VF.ttf"
SHA256 = "8e052cbcdbd0f03496c9ad05da7d57901549286d5efd30f3caf66a393f6c389b"


def write_atomic(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as file:
        file.write(data)
    Path(file.name).replace(path)


def master_font():
    cache = Path(".next/cache/article-font/source.ttf")
    if cache.exists():
        data = cache.read_bytes()
        if hashlib.sha256(data).hexdigest() == SHA256:
            return data
    with urllib.request.urlopen(URL, timeout=90) as response:
        data = response.read()
    if hashlib.sha256(data).hexdigest() != SHA256:
        raise ValueError("Unexpected Source Han Serif font checksum")
    write_atomic(cache, data)
    return data


def generate(master, entry):
    font = TTFont(io.BytesIO(master), recalcTimestamp=False)
    options = subset.Options()
    options.name_IDs += [13, 14]  # Retain the license and its URL.
    cut = subset.Subsetter(options=options)
    cut.populate(text=entry["glyphs"])
    cut.subset(font)
    family = "Blog Intro " + entry["id"]
    for record in font["name"].names:
        if record.nameID in (1, 3, 4, 6, 16, 25):
            record.string = (family.replace(" ", "") if record.nameID in (6, 25) else family).encode(record.getEncoding())
    font.flavor = "woff2"
    output = io.BytesIO()
    font.save(output)
    write_atomic(Path("public/fonts/intro") / (entry["id"] + ".woff2"), output.getvalue())


if __name__ == "__main__":
    source = master_font()
    for entry in json.load(sys.stdin.buffer):
        generate(source, entry)
