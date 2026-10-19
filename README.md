# yifei.sg

Personal blog and research software portfolio for Yifei Zheng. Built with Jekyll
and Minima v3 through `jekyll-remote-theme`, and published by GitHub Pages at
<https://yifei.sg>.

## Local development

Use Ruby **3.3.10** (also recorded in `.ruby-version`) and Bundler **2.5.22**:

```sh
gem install bundler -v 2.5.22
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>. To check production and draft builds:

```sh
JEKYLL_ENV=production bundle exec jekyll build
bundle exec jekyll build --drafts --destination _site-drafts
```

The production build excludes drafts. Remove `_site-drafts` after checking it;
both build directories are ignored by Git and excluded from Jekyll input.

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

## Deployment and dependency updates

GitHub Pages publishes from **`main`**, at the repository root. Keep the Pages
source branch and the `github-pages` environment's allowed deployment branch
aligned. The custom domain is configured in Pages settings and `CNAME`; HTTPS
is enforced. No custom deployment workflow is required.

`github-pages` is pinned in `Gemfile`, resolved dependencies in `Gemfile.lock`,
and Minima to a commit in `_config.yml`. To update:

1. Check <https://pages.github.com/versions/> before changing the Pages gem pin.
2. Run `bundle update github-pages` after changing that pin, or
   `bundle update webrick` to update the local preview server.
3. Update Minima's commit separately after reviewing upstream changes.
4. Rebuild production and drafts, compare all published post URLs, and check
   navigation, profiles, software JSON-LD, and the embedded charts before pushing.

Commit the updated lockfile with dependency changes. `Gemfile.lock` covers Ruby
gems; the explicit remote-theme commit pins Minima independently.

The lockfile reproduces local builds. Branch-based Pages uses GitHub's
preinstalled gem bundle, so some transitive versions can differ and its
dependency check can warn about missing locked gems before building
successfully. The Pages gem pin aligns Jekyll and its supported plugins; verify
the hosted deployment as well as local builds after updates.
