# Profile design

The profile uses black (`#131316`), soft white (`#faf8f9`) and powder pink (`#edb3cc`). The banner and closing illustration have light and dark variants selected with GitHub’s supported `<picture>` markup. Project illustrations share this palette and are stylised artwork, not product screenshots.

All essential descriptions, project links and contact details remain readable text in `README.md`. The SVGs have no scripts, remote fonts or remote resources. The profile does not depend on badge, visitor-counter or statistics image services. The existing daily contribution-snake workflow supplies the activity image from this repository’s `output` branch.

Regenerate the artwork with Node.js:

```sh
node scripts/generate-assets.mjs
```

Content checked on 2026-10-21 against:

- [Zoovix README](https://github.com/Ponchik0/Zoovix/blob/main/README.md) and [package.json](https://github.com/Ponchik0/Zoovix/blob/main/package.json): catalog, localisation and PWA. Version numbers are omitted because several dependencies track `latest`.
- [Portfolio sources](https://github.com/Ponchik0/portfolio): Astro, TypeScript and CSS; EN / UK / RU routes; project cases.
- [Maksym Café case](https://ponchik0.github.io/portfolio/uk/projects/maksym-cafe/): explicitly labelled as an independent pilot concept.
- [Poezdato case](https://ponchik0.github.io/portfolio/uk/projects/poezdato/): explicitly labelled as a redesign concept.
- Existing profile README/assets: public email and Discord handle. Telegram is the owner’s confirmed project contact.
- [GitHub’s profile formatting guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github): theme-aware artwork.

Availability, uptime, download counts, response times and client results are not asserted. The website in `Ponchik0/portfolio` is a separate project.
