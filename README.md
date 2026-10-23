# yifei.sg

Personal blog and research software portfolio for Yifei Zheng. Built with Jekyll
and Minima v3 through `jekyll-remote-theme`, and published by GitHub Pages at
<https://yifei.sg>.

## Builds

GitHub Pages builds the site with its maintained Ruby and gem bundle. This
repository does not manage a local Ruby version, Gemfile, or lockfile.

Push changes to `main`, check the Pages build and deployment in GitHub Actions,
then verify the published site. Drafts under `_drafts` remain unpublished.

## Content and configuration

- Create posts in `_posts/YYYY-MM-DD-slug.markdown`, with `layout: post`, a
  title, a date with its UTC offset, a description, and one primary tag. Site
  time is Asia/Singapore (`+0800`). Copy `_drafts/template.markdown` to start a
  draft, and add its date when publishing.
- Keep existing categories and permalink settings unchanged: published post URLs
  include `/jekyll/update/`. Use tags for topics without changing those URLs.
- Edit `_data/software.yml` for the software portfolio. Keep project IDs stable;
  use typed links (`repository`, `registry`, `app`, or `documentation`) and
  schema.org relationships such as `author` and `maintainer`.
- Edit `_data/photography.yml` for Photography. Entries sort by publication date,
  newest first, flowing left to right through the masonry layout. Keep IDs stable
  for links to individual features. See the fields below.
- Manage profile URLs only in `social.links` in `_config.yml`. Optional labels
  are keyed by hostname under `social.labels`; unknown hosts display their
  hostname. About, the footer, and JSON-LD share this list. Email uses `email`.
- Local header, footer, and page layout files override Minima defaults. The
  chart includes used by the WhatsApp analysis post remain part of the site.

## Photography

Each entry requires `id`, `title`, a quoted publication `date` (`YYYY-MM-DD`), and
an HTTPS `url`. Use the source's publication date, rather than the photograph's
capture date or the article's last update. Optional `description` supports
Markdown. Instagram `/p/` and `/reel/` URLs and Facebook `/posts/`,
`/photos/`, and `/reel/` URLs generate native embeds. Other URLs render editorial
link cards. Every card has a 14px caption beneath its image or embed, without a
separate title. Write `description` as subject, feature date, organisation, and
event or publication context where applicable. Use `[Organisation][source]` to
link to the entry's `url`, and italics only for publication names. Entries without
a description fall back to their linked title. Caption links are underlined,
marked with ↗, and open in a new tab.
For an article preview, set `image_url` to the publisher-hosted image and
`image_alt` to a description. The image links to `url` and keeps its proportions.

```yaml
- id: published-feature
  date: "2026-01-15"
  title: A published photography feature
  url: https://example.org/article/
  image_url: https://example.org/featured-photo.jpg
  image_alt: A bird perched on a flowering branch.
  description: A bird featured on 15 January 2026 by [Example Publisher][source].

- id: instagram-feature
  date: "2025-12-01"
  title: An Instagram feature
  url: https://www.instagram.com/p/POST_ID/
```

Set `embed_url` to a provider's canonical permalink when the source URL does not
embed correctly. To show individual photos from an Instagram carousel in separate
cards, use each photo's permalink as `embed_url` and retain the shared post as
`url`. For Facebook posts, the post's Embed menu supplies the canonical permalink.

For other services, optional `embed_html: |` accepts trusted provider HTML and
overrides automatic rendering. Include any script required by that custom embed;
avoid repeating scripts across entries. Built-in Instagram and Facebook scripts
load only when needed and once per page.

The two GBBC 2024 cards show the Crimson Sunbird and Oriental Pratincole separately,
each linking to its caption using a text fragment. Browsers without text-fragment
support open the article normally.

## Deployment and theme updates

GitHub Pages publishes from **`main`**, at the repository root. Keep the Pages
source branch and the `github-pages` environment's allowed deployment branch
aligned. The custom domain is configured in Pages settings and `CNAME`; HTTPS
is enforced. No custom deployment workflow is required.

GitHub controls the hosted dependencies; its published versions are listed at
<https://pages.github.com/versions/>. Minima is pinned independently to a commit
in `_config.yml`.

To update Minima, review upstream changes and change the remote-theme commit.
After the hosted deployment succeeds, compare published post URLs and check
navigation, profiles, software JSON-LD, and the embedded charts.
