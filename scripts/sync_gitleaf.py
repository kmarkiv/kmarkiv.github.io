#!/usr/bin/env python3
"""Refresh GitLeaf's static guide, images and published downloads from GitHub.

Run after pushing the GitLeaf README, then review, commit and push the website.
No credentials, third-party Python packages or scheduled job are required.
"""

import hashlib
import json
from pathlib import Path
import re
from urllib.parse import urljoin
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
REPO = "https://github.com/kmarkiv/gitleaf"
API = "https://api.github.com/repos/kmarkiv/gitleaf"


def fetch(url):
    request = Request(url, headers={"User-Agent": "GitLeaf-website-sync", "Accept": "application/vnd.github+json"})
    with urlopen(request, timeout=30) as response:
        data = response.read(8 * 1024 * 1024 + 1)
    if len(data) > 8 * 1024 * 1024:
        raise ValueError("GitLeaf source file exceeds the sync size limit")
    return data


def make_guide(readme, sha):
    # The promotional README header is already represented by the landing page.
    # Keep every documentation section, and resolve repository-relative links.
    marker = "## Get started\n"
    if marker not in readme or "## License" not in readme:
        raise ValueError("README structure changed; review the guide extraction")
    guide = marker + readme.split(marker, 1)[1]
    base = f"{REPO}/blob/{sha}/"

    def link(match):
        target = match[2]
        if target.startswith(("#", "https://", "http://", "mailto:")):
            return match[0]
        return match[1] + urljoin(base, target) + match[3]

    return re.sub(r"(\]\()([^\s)]+)(\))", link, guide)


def main():
    commit = json.loads(fetch(API + "/commits/main"))
    sha = commit["sha"]
    if not re.fullmatch(r"[a-f0-9]{40}", sha):
        raise ValueError("Invalid GitLeaf source revision")
    raw = f"https://raw.githubusercontent.com/kmarkiv/gitleaf/{sha}/"
    readme_bytes = fetch(raw + "README.md")
    readme = readme_bytes.decode("utf-8")
    package = json.loads(fetch(raw + "package.json"))
    release = json.loads(fetch(API + "/releases/latest"))
    if release["draft"] or release["prerelease"]:
        raise ValueError("Expected a published stable release")
    assets = {a["name"]: a for a in release["assets"] if a["state"] == "uploaded"}
    downloads = []
    for label, suffix, description in [
        ("Mac · Apple silicon", "macos-arm64", "M1, M2, M3 and newer Apple chips"),
        ("Mac · Intel", "macos-x86_64", "Macs with an Intel processor"),
        ("Windows", "windows-x86_64.exe", "64-bit Windows PCs"),
        ("Linux · x86_64", "linux-x86_64", "Most Intel and AMD PCs"),
        ("Linux · ARM64", "linux-arm64", "64-bit ARM computers"),
    ]:
        executable = "gitleaf-" + suffix
        name = executable + ".dmg" if executable + ".dmg" in assets else executable
        if name not in assets:
            continue
        url = assets[name]["browser_download_url"]
        if not url.startswith(REPO + "/releases/download/"):
            raise ValueError("Unexpected download URL")
        downloads.append({"label": label, "description": description, "name": name,
                          "url": url, "format": "Mac app · DMG" if name.endswith(".dmg") else "Standalone executable"})
    if not downloads:
        raise ValueError("No supported published downloads found")
    screenshot = fetch(raw + "docs/screenshot.jpg")
    logo = fetch(raw + "docs/logo.svg")
    if not screenshot.startswith(b"\xff\xd8") or b"<svg" not in logo:
        raise ValueError("Unexpected GitLeaf image format")
    data = {"source_sha": sha, "source_url": f"{REPO}/blob/{sha}/README.md",
            "readme_sha256": hashlib.sha256(readme_bytes).hexdigest(),
            "source_version": package["version"], "release_version": release["tag_name"],
            "release_url": release["html_url"], "downloads": downloads,
            "has_dmg": any(d["name"].endswith(".dmg") for d in downloads),
            "guide": make_guide(readme, sha)}
    # Validate/download everything before replacing the last usable snapshot.
    outputs = {ROOT / "_data/gitleaf.json": (json.dumps(data, ensure_ascii=False, indent=2) + "\n").encode(),
               ROOT / "assets/images/gitleaf/screenshot.jpg": screenshot,
               ROOT / "assets/images/gitleaf/logo.svg": logo}
    for path, content in outputs.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        temporary = path.with_suffix(path.suffix + ".tmp")
        temporary.write_bytes(content)
        temporary.replace(path)
    print(f"GitLeaf guide: {sha[:7]}; downloads: {release['tag_name']}; {len(downloads)} platforms")


if __name__ == "__main__":
    main()
