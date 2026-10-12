# Website maintenance

GitLeaf lives at https://kmarkiv.com/gitleaf/. Its full setup guide is generated
from the GitHub README, with a committed snapshot for static HTML rendering.

When GitLeaf README changes are pushed to `kmarkiv/gitleaf`, refresh this website
in the same task: run `python3 scripts/sync_gitleaf.py`, review the snapshot and
download links, then commit and push the website changes. Do not add a scheduled
sync; the owner explicitly prefers updates alongside README pushes.

The sync script uses public GitHub data and prefers Mac DMGs only when a published
release actually includes them. Keep source version and published release version
distinct. Maintain the free, lightweight, offline LaTeX editor positioning on the landing
page and README. Qualify offline compilation: all required packages and tools
must already be cached or installed; downloads and remote Git operations need
internet.

Preserve unrelated local changes, including `.DS_Store`.
