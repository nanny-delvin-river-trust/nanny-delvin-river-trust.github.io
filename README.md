# Nanny-Delvin Rivers Trust Website

> **A prototype for community-supported catchment intelligence in the River Nanny and River Delvin catchments.**

This repository contains the public website and supporting digital resources for the Nanny-Delvin Rivers Trust.

It demonstrates how community engagement, structured citizen science, ecological stewardship and nature-based solutions can contribute to better understanding and long-term management of a river catchment.

## Live website

https://nanny-delvin-river-trust.github.io/

> **Status:** Active prototype under continuous development through GitHub Pages.

## Why this repository exists

Healthy catchments depend on informed decisions.

The website aims to communicate environmental issues clearly, encourage responsible public participation and demonstrate practical approaches that connect community observations with ecological understanding.

Rather than presenting isolated pages, the repository explores how information, field observations and restoration activity can contribute to a broader picture of catchment condition.

It is intended to evolve alongside the Trust's work and future projects.

## Current components

- Trust homepage
- Nanny Watch citizen-science prototype
- CSSI stream-health guidance
- Seasonal ecological safeguards for community sampling
- Nature-based-solutions condition checks
- Spartina and estuary stewardship guidance
- News and project updates
- Shared website styles, scripts and images

## Key pages

| Page | Purpose |
|---|---|
| [Home](index.html) | Trust overview and main public landing page |
| [Citizen Science](citizen-science.html) | Nanny Watch and community-supported catchment intelligence prototype |
| [News](news/) | Project news and updates |

## Community-supported catchment intelligence

A central purpose of the prototype is to explore how structured community observations might complement professional and statutory monitoring.

The concept connects evidence such as:

- CSSI stream-health observations
- habitat and riparian-condition notes
- photographs and repeat photo points
- recent rainfall and visible flow conditions
- fine sediment, algae, outfalls and bank damage
- invasive-species observations
- barriers, culverts and habitat discontinuities
- checks on the condition and performance of nature-based measures

Citizen science does not replace EPA monitoring, laboratory analysis, regulatory investigation, formal ecological-status assessment or qualified ecological advice.

Its purpose is to extend the evidence network, support repeat observation and help identify where verification, maintenance, professional investigation or restoration planning may be required.

## Repository structure

```text
.
├── index.html               Main website homepage
├── citizen-science.html     Nanny Watch prototype
├── README.md                Repository documentation
├── LICENSE                  Copyright and reuse terms
├── .gitignore               Local files excluded from Git
├── assets/                  Shared styles, scripts and images
└── news/                    News and update pages
```

## Local development

From the repository root, start a local server:

```bash
python -m http.server 8000
```

Open:

- http://localhost:8000/
- http://localhost:8000/citizen-science.html

Stop the server with `Ctrl+C`.

No build step is currently required.

## Development workflow

Before editing:

```bash
git pull origin main
git status
```

After editing:

```bash
git diff --check
git diff
```

Preview the website locally before committing.

Stage only the files you intend to publish:

```bash
git add <file-name>
git commit -m "Describe the purpose of the change"
git push origin main
```

## Development principles

The website should remain:

- scientifically cautious
- understandable to non-specialists
- transparent about uncertainty and limitations
- explicit about the difference between citizen observation and statutory assessment
- careful about land access, personal safety and ecological disturbance
- clear about whether forms and reporting routes are live or demonstrative
- lightweight, accessible and maintainable
- usable on both desktop and mobile devices

## Ecological safeguards

Community field activity must not disturb spawning fish, lamprey redds, eggs, fry, protected habitats or sensitive species.

Access permission, weather, water depth, current velocity, tide, biological sensitivity and participant competence must be considered before field activity.

Where statutory, professional or specialist assessment is required, volunteers should defer to the relevant competent authority or qualified practitioner.

## Nature-based solutions

Nature-based measures should be assessed according to their intended ecological or hydrological function, site suitability, evidence of performance, maintenance requirements and possible effects beyond the intervention boundary.

Relevant questions include:

- What function is being restored?
- What pressure or pathway is being addressed?
- What water movement is being slowed, blocked, diverted or reconnected?
- What evidence would demonstrate success?
- What risks or trade-offs exist?
- Who will monitor and maintain the measure?
- What happens if the intervention performs differently from expectations?

## Data protection

The current prototype does not establish an operational system for collecting personal or environmental reports.

Any future live reporting service will require:

- a clearly identified data controller
- a lawful basis for processing
- a privacy notice
- data-retention rules
- access controls
- consent and safeguarding procedures where appropriate
- a defined verification and response workflow

## Roadmap

Potential future development includes:

- interactive catchment mapping
- structured observation workflows
- downloadable field guides
- project-monitoring pages
- restoration case studies
- verified nature-based-solutions records
- official Trust email integration
- accessibility and performance review
- expanded community resources
- a catchment-intelligence dashboard

## Copyright and licence

Copyright © 2026 Nanny-Delvin Rivers Trust.

Unless explicitly stated otherwise, the original source code, text, graphics, documentation and design contained within this repository are protected by copyright.

This repository is published on an **All Rights Reserved** basis.

Public visibility on GitHub does not grant permission to reproduce, modify, distribute, republish or commercially exploit the repository contents.

Third-party material remains subject to its own copyright, licence and attribution requirements.

See the [LICENSE](LICENSE) file for details.

## Acknowledgements

The initial website architecture, citizen-science prototype and catchment-intelligence concept were developed by André C. Baumann in collaboration with the Nanny-Delvin Rivers Trust during 2026.

The repository is intended to evolve through future contributions by the Trust and its community.

## Contact

The website is currently under development.

Official Trust contact information will be added once the Trust's domain, email and organisational communication arrangements are operational.
