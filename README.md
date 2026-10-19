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
- Manage profile URLs only in `social.links` in `_config.yml`. Optional labels
  are keyed by hostname under `social.labels`; unknown hosts display their
  hostname. About, the footer, and JSON-LD share this list. Email uses `email`.
- Local header, footer, and page layout files override Minima defaults. The
  chart includes used by the WhatsApp analysis post remain part of the site.

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
