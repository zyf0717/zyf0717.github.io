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
- Edit `_data/photography.yml` for Photography. Entries flow down masonry
  columns in YAML order; keep IDs stable for links to individual features.
  See the fields below.
- Manage profile URLs only in `social.links` in `_config.yml`. Optional labels
  are keyed by hostname under `social.labels`; unknown hosts display their
  hostname. About, the footer, and JSON-LD share this list. Email uses `email`.
- Local header, footer, and page layout files override Minima defaults. The
  chart includes used by the WhatsApp analysis post remain part of the site.

## Photography

Each entry requires `id`, `title`, and an HTTPS `url`. Optional `description`
supports Markdown. Instagram `/p/` and `/reel/` URLs and Facebook `/posts/`,
`/photos/`, and `/reel/` URLs generate native embeds. Other URLs render editorial
link cards with titles linking to their sources. Embedded posts omit titles.

```yaml
- id: published-feature
  title: A published photography feature
  url: https://example.org/article/
  description: My photograph accompanies this article.

- id: instagram-feature
  title: An Instagram feature
  url: https://www.instagram.com/p/POST_ID/
```

Set `embed_url` to a provider's canonical permalink when the source URL does not
embed correctly. For Facebook posts, the post's Embed menu supplies the canonical
permalink.

For other services, optional `embed_html: |` accepts trusted provider HTML and
overrides automatic rendering. Include any script required by that custom embed;
avoid repeating scripts across entries. Built-in Instagram and Facebook scripts
load only when needed and once per page.

The GBBC 2024 entry links to its Crimson Sunbird caption using a text fragment.
Browsers without support open the article normally; the card identifies the Asia
section and both featured photographs.

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
