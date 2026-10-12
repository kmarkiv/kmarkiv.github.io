# GitLeaf website updates

The landing page is `/gitleaf/`; the complete README guide is `/gitleaf/guide/`.
Both are static Jekyll pages. Visitors need no JavaScript or GitHub API request
to read the documentation or follow a download link.

After pushing a change to GitLeaf's README, run from this website repository:

```sh
python3 scripts/sync_gitleaf.py
```

The script downloads a single source revision's README, version and images, then
reads the latest published release. It refreshes `_data/gitleaf.json` and
`assets/images/gitleaf/`. The guide retains every README documentation section;
repository-relative links point back to the exact GitHub source revision. Liquid
renders the Markdown from data rather than executing README text as a template.

Review the changes and the rendered guide, then commit and push them to `master`.
The existing GitHub Pages branch build publishes the site. No daily sync or
publishing-settings changes are needed. Changes to curated landing-page copy
remain manual; update it if the README changes the app's behavior or requirements.

The page links directly to assets from the published release. Mac DMGs are
preferred when available; until then it links to standalone executables. Rerun
the script after publishing a release to expose newly published packages.
