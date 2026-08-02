# Noir

Static website built with HTML and CSS.

## Overview

A minimal static site with HTML pages and stylesheet assets.

## Core Architecture

```mermaid
flowchart LR
    Browser -->|serves| Pages["HTML pages"]
    Pages -->|styles| CSS["css/"]
```

## System Components

| Component | Responsibility |
|---|---|
| `index.html` | Entry page |
| `css/` | Stylesheets |

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Structure | HTML5 | Page markup |
| Styling | CSS3 | Visual design |

## Requirements

- Any modern web browser
- No build step

## Getting Started

```bash
git clone <repo-url>
cd Noir
open index.html
```
