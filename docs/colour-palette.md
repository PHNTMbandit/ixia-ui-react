# Ixia colour palette

The colour foundation for `ixia-ui-react`. It follows Tailwind's 50–950 scale structure, but every value here is original. Each colour was designed in OKLCH, converted to sRGB hex, and checked with **APCA (APCA-W3 0.0.98G-4g)** as the main contrast method. **WCAG 2.x** was checked as well.

- CSS: [src/styles/input.css](../src/styles/input.css) (primitives + `--ixia-*` semantic tokens)
- Alternative brand themes: [src/styles/themes/](../src/styles/themes/) (`mabel`, `viridiflora`, `hogarth`, `venus`, `monadelpha`)
- Storybook: **Color Palette/Primitives** for the shared scales, plus one **Color Palette/{Theme}** entry per theme with semantic tokens and a live APCA/WCAG matrix

Design priority: **accessibility → semantic usability → visual coherence → Ixia identity → aesthetics**.

## Contrast targets (APCA Lc, absolute value)

|  Lc | Use                                                                           |
| --: | ----------------------------------------------------------------------------- |
|  90 | Preferred body text                                                           |
|  75 | Minimum body / paragraph text                                                 |
|  60 | UI text: labels, buttons, links, captions (≥ 14px semibold or 16px regular)   |
|  45 | Large text (≥ 24px) and headings, icons                                       |
|  30 | Non-text: control boundaries, focus rings, meaningful icons (also WCAG ≥ 3:1) |
|  15 | Decorative dividers and outlines that carry no meaning                        |

Text pairs also meet **WCAG AA 4.5:1**. Non-text pairs also meet **WCAG 3:1**.

---

## A. Primitive palette

### How the ladder works

Every chromatic family uses the **same OKLCH lightness for the same step**. As a result, a given step has nearly the same APCA contrast in every hue. Changing `error` to `warning`, or brand to accent, keeps text legible.

| Step | L (OKLCH) | Lc vs white | Lc vs neutral-950 | Intended usage                                                                |
| ---: | --------: | ----------: | ----------------: | ----------------------------------------------------------------------------- |
|   50 |     97.5% |          ~0 |             ~−102 | Subtle backgrounds, hover tints (`subtle`)                                    |
|  100 |     94.8% |          ~8 |              ~−96 | Containers, alerts (`container`); dark-mode text on 900/950                   |
|  200 |     90.5% |         ~16 |              ~−87 | Container-high, selected rows; dark-mode body text                            |
|  300 |     83.5% |         ~29 |              ~−73 | Light-mode decorative borders; dark-mode hover fills and muted text           |
|  400 |     79.0% |         ~37 |              ~−64 | **Dark-mode interactive fills and coloured text**. Decorative only on light   |
|  500 |     64.5% |         ~60 |              ~−41 | Strong borders, icons, charts, large text on light. **Not for body text**     |
|  600 |     54.0% |         ~75 |              ~−26 | **Light-mode interactive fills (white label) and coloured UI text**           |
|  700 |     48.0% |         ~82 |              ~−19 | Light-mode hover fills, secondary coloured text; dark-mode decorative borders |
|  800 |     40.5% |         ~90 |              ~−11 | Strong text and emphasis on light                                             |
|  900 |     33.5% |         ~97 |                 0 | Text on light containers; dark-mode container-high                            |
|  950 |     26.0% |        ~102 |                 0 | Dark-mode containers and subtle tints                                         |

Exceptions:

- **neutral** uses its own ladder (98.6 / 96.8 / 93.5 / 88.5 / 79 / 65 / 53 / 43 / 31.5 / 23.5 / 18%). This leaves room for four distinct dark surfaces and a clear text hierarchy.
- **yellow** is lifted (98.5 … 28.5%) so that 400–500 actually look yellow. Its text-safe step on light is **700**, not 600. `yellow-500` on white is Lc 35 and is **never for text**. Use it as a fill with `neutral-950` text (Lc 68).

**Never use for text on light surfaces:** every 50–400 step, and `yellow-500`/`yellow-600`.
**Never use for text on dark surfaces:** every 500–950 step.

### Primitive table

OKLCH is the source of truth. Hex is the sRGB value after gamut mapping (only chroma is reduced; L and h are kept). Lc values are text-on-background.

#### neutral (warm stone, h 70 → 48)

| Token         | Hex       | OKLCH                     | Lc on white | Lc on neutral-950 |
| ------------- | --------- | ------------------------- | ----------: | ----------------: |
| `neutral-50`  | `#fcfaf8` | `oklch(98.6% 0.004 70.0)` |         0.0 |            −104.2 |
| `neutral-100` | `#f7f4f0` | `oklch(96.8% 0.006 67.8)` |         0.0 |            −100.3 |
| `neutral-200` | `#ede8e4` | `oklch(93.5% 0.008 65.6)` |        10.7 |             −92.9 |
| `neutral-300` | `#ded8d2` | `oklch(88.5% 0.010 63.4)` |        20.0 |             −82.9 |
| `neutral-400` | `#c0b9b3` | `oklch(79.0% 0.012 61.2)` |        37.2 |             −64.7 |
| `neutral-500` | `#958d87` | `oklch(65.0% 0.013 59.0)` |        60.0 |             −41.2 |
| `neutral-600` | `#726a65` | `oklch(53.0% 0.013 56.8)` |        76.4 |             −24.8 |
| `neutral-700` | `#554e4a` | `oklch(43.0% 0.012 54.6)` |        88.2 |             −13.4 |
| `neutral-800` | `#36302d` | `oklch(31.5% 0.011 52.4)` |        99.2 |               0.0 |
| `neutral-900` | `#221d1a` | `oklch(23.5% 0.009 50.2)` |       103.6 |               0.0 |
| `neutral-950` | `#14110f` | `oklch(18.0% 0.007 48.0)` |       105.3 |               0.0 |

#### red (h 30 → 18)

| Token     | Hex       | OKLCH                     | Lc on white | Lc on neutral-950 |
| --------- | --------- | ------------------------- | ----------: | ----------------: |
| `red-50`  | `#fff4f2` | `oklch(97.5% 0.012 30.0)` |         0.0 |            −101.6 |
| `red-100` | `#ffe8e4` | `oklch(94.8% 0.026 28.8)` |         8.2 |             −95.5 |
| `red-200` | `#ffd4ce` | `oklch(90.5% 0.049 27.6)` |        17.1 |             −85.9 |
| `red-300` | `#ffb2aa` | `oklch(83.5% 0.091 26.4)` |        30.9 |             −71.3 |
| `red-400` | `#ff9b93` | `oklch(79.0% 0.121 25.2)` |        39.1 |             −62.7 |
| `red-500` | `#f1484c` | `oklch(64.5% 0.205 24.0)` |        62.7 |             −38.4 |
| `red-600` | `#cb1b30` | `oklch(54.0% 0.205 22.8)` |        76.0 |             −25.1 |
| `red-700` | `#af0a29` | `oklch(48.0% 0.189 21.6)` |        82.9 |             −18.5 |
| `red-800` | `#8c0020` | `oklch(40.5% 0.163 20.4)` |        90.4 |             −11.3 |
| `red-900` | `#6b0018` | `oklch(33.5% 0.135 19.2)` |        96.8 |               0.0 |
| `red-950` | `#4a000f` | `oklch(26.0% 0.105 18.0)` |       101.8 |               0.0 |

#### orange: Ixia maculata, **brand** (h 64 → 32)

| Token        | Hex       | OKLCH                     | Lc on white | Lc on neutral-950 |
| ------------ | --------- | ------------------------- | ----------: | ----------------: |
| `orange-50`  | `#fff5ec` | `oklch(97.5% 0.016 64.0)` |         0.0 |            −101.8 |
| `orange-100` | `#ffe9d8` | `oklch(94.8% 0.033 60.8)` |         8.3 |             −95.4 |
| `orange-200` | `#ffd7ba` | `oklch(90.5% 0.060 57.6)` |        16.7 |             −86.4 |
| `orange-300` | `#ffb686` | `oklch(83.5% 0.106 54.4)` |        30.5 |             −71.7 |
| `orange-400` | `#ffa065` | `oklch(79.0% 0.136 51.2)` |        38.6 |             −63.2 |
| `orange-500` | `#df6400` | `oklch(64.5% 0.176 48.0)` |        62.0 |             −39.1 |
| `orange-600` | `#b44900` | `oklch(54.0% 0.155 44.8)` |        76.0 |             −25.2 |
| `orange-700` | `#9e3800` | `oklch(48.0% 0.146 41.6)` |        83.1 |             −18.3 |
| `orange-800` | `#802500` | `oklch(40.5% 0.132 38.4)` |        91.2 |             −10.6 |
| `orange-900` | `#661500` | `oklch(33.5% 0.117 35.2)` |        97.3 |               0.0 |
| `orange-950` | `#490600` | `oklch(26.0% 0.099 32.0)` |       102.0 |               0.0 |

#### amber (h 86 → 56)

| Token       | Hex       | OKLCH                     | Lc on white | Lc on neutral-950 |
| ----------- | --------- | ------------------------- | ----------: | ----------------: |
| `amber-50`  | `#fff6e3` | `oklch(97.5% 0.027 86.0)` |         0.0 |            −101.8 |
| `amber-100` | `#ffecc8` | `oklch(94.8% 0.051 83.0)` |         7.6 |             −96.2 |
| `amber-200` | `#fcdaa2` | `oklch(90.5% 0.082 80.0)` |        16.6 |             −86.5 |
| `amber-300` | `#f2bf71` | `oklch(83.5% 0.112 77.0)` |        29.8 |             −72.5 |
| `amber-400` | `#eeac4a` | `oklch(79.0% 0.136 74.0)` |        37.9 |             −64.0 |
| `amber-500` | `#c27d00` | `oklch(64.5% 0.139 71.0)` |        60.8 |             −40.3 |
| `amber-600` | `#9b5f00` | `oklch(54.0% 0.119 68.0)` |        75.5 |             −25.7 |
| `amber-700` | `#864e00` | `oklch(48.0% 0.108 65.0)` |        82.9 |             −18.4 |
| `amber-800` | `#6c3b00` | `oklch(40.5% 0.093 62.0)` |        91.0 |             −10.8 |
| `amber-900` | `#542a00` | `oklch(33.5% 0.080 59.0)` |        97.6 |               0.0 |
| `amber-950` | `#3b1a00` | `oklch(26.0% 0.064 56.0)` |       102.4 |               0.0 |

#### yellow (lifted ladder, h 102 → 68)

| Token        | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ------------ | --------- | -------------------------- | ----------: | ----------------: |
| `yellow-50`  | `#fdfbe7` | `oklch(98.5% 0.027 102.0)` |         0.0 |            −104.1 |
| `yellow-100` | `#fcf5ce` | `oklch(96.5% 0.051 98.6)`  |         0.0 |            −100.1 |
| `yellow-200` | `#faeaab` | `oklch(93.5% 0.082 95.2)`  |        10.0 |             −93.6 |
| `yellow-300` | `#f9dc84` | `oklch(90.0% 0.112 91.8)`  |        17.0 |             −86.1 |
| `yellow-400` | `#f6cc5d` | `oklch(86.0% 0.136 88.4)`  |        24.5 |             −78.1 |
| `yellow-500` | `#eeb400` | `oklch(80.0% 0.164 85.0)`  |        35.4 |             −66.6 |
| `yellow-600` | `#c38e00` | `oklch(68.0% 0.140 81.6)`  |        55.3 |             −45.9 |
| `yellow-700` | `#9b6c00` | `oklch(56.5% 0.118 78.2)`  |        71.9 |             −29.3 |
| `yellow-800` | `#7d5200` | `oklch(47.5% 0.100 74.8)`  |        83.3 |             −18.1 |
| `yellow-900` | `#603c00` | `oklch(39.0% 0.084 71.4)`  |        92.4 |              −9.4 |
| `yellow-950` | `#3e2300` | `oklch(28.5% 0.063 68.0)`  |       101.1 |               0.0 |

#### lime (h 128 → 132)

| Token      | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ---------- | --------- | -------------------------- | ----------: | ----------------: |
| `lime-50`  | `#f1fbe7` | `oklch(97.5% 0.028 128.0)` |         0.0 |            −102.4 |
| `lime-100` | `#e3f5d0` | `oklch(94.8% 0.052 128.4)` |         0.0 |             −96.8 |
| `lime-200` | `#cfebb0` | `oklch(90.5% 0.084 128.8)` |        14.8 |             −88.4 |
| `lime-300` | `#b1d886` | `oklch(83.5% 0.115 129.2)` |        27.4 |             −75.0 |
| `lime-400` | `#9dcc67` | `oklch(79.0% 0.140 129.6)` |        35.1 |             −66.9 |
| `lime-500` | `#69a100` | `oklch(64.5% 0.174 130.0)` |        58.1 |             −43.1 |
| `lime-600` | `#507e00` | `oklch(54.0% 0.146 130.4)` |        73.4 |             −27.8 |
| `lime-700` | `#426b00` | `oklch(48.0% 0.131 130.8)` |        81.1 |             −20.2 |
| `lime-800` | `#325400` | `oklch(40.5% 0.111 131.2)` |        89.7 |             −12.0 |
| `lime-900` | `#244000` | `oklch(33.5% 0.093 131.6)` |        96.5 |               0.0 |
| `lime-950` | `#162b00` | `oklch(26.0% 0.073 132.0)` |       102.0 |               0.0 |

#### green (h 150)

| Token       | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ----------- | --------- | -------------------------- | ----------: | ----------------: |
| `green-50`  | `#ebfcee` | `oklch(97.5% 0.026 150.0)` |         0.0 |            −102.4 |
| `green-100` | `#d7f8dd` | `oklch(94.8% 0.050 150.0)` |         0.0 |             −97.3 |
| `green-200` | `#bbefc4` | `oklch(90.5% 0.079 150.0)` |        14.4 |             −88.8 |
| `green-300` | `#94dda3` | `oklch(83.5% 0.109 150.0)` |        26.9 |             −75.5 |
| `green-400` | `#78d28d` | `oklch(79.0% 0.132 150.0)` |        34.4 |             −67.6 |
| `green-500` | `#24a854` | `oklch(64.5% 0.165 150.0)` |        57.3 |             −43.9 |
| `green-600` | `#00853c` | `oklch(54.0% 0.149 150.0)` |        72.3 |             −28.8 |
| `green-700` | `#007131` | `oklch(48.0% 0.132 150.0)` |        80.1 |             −21.2 |
| `green-800` | `#005925` | `oklch(40.5% 0.112 150.0)` |        88.8 |             −12.8 |
| `green-900` | `#00431a` | `oklch(33.5% 0.093 150.0)` |        96.1 |               0.0 |
| `green-950` | `#002d0f` | `oklch(26.0% 0.072 150.0)` |       101.8 |               0.0 |

#### emerald (h 166 → 164)

| Token         | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ------------- | --------- | -------------------------- | ----------: | ----------------: |
| `emerald-50`  | `#e9fcf3` | `oklch(97.5% 0.024 166.0)` |         0.0 |            −102.4 |
| `emerald-100` | `#d3f8e7` | `oklch(94.8% 0.045 165.8)` |         0.0 |             −97.2 |
| `emerald-200` | `#b3f0d4` | `oklch(90.5% 0.072 165.6)` |        14.1 |             −89.2 |
| `emerald-300` | `#88deb9` | `oklch(83.5% 0.099 165.4)` |        26.6 |             −75.8 |
| `emerald-400` | `#65d3a8` | `oklch(79.0% 0.120 165.2)` |        34.2 |             −67.8 |
| `emerald-500` | `#00a779` | `oklch(64.5% 0.136 165.0)` |        57.1 |             −44.1 |
| `emerald-600` | `#00835e` | `oklch(54.0% 0.114 164.8)` |        72.5 |             −28.7 |
| `emerald-700` | `#006f4f` | `oklch(48.0% 0.102 164.6)` |        80.4 |             −20.9 |
| `emerald-800` | `#00573d` | `oklch(40.5% 0.086 164.4)` |        89.1 |             −12.5 |
| `emerald-900` | `#00422d` | `oklch(33.5% 0.071 164.2)` |        96.1 |               0.0 |
| `emerald-950` | `#002c1d` | `oklch(26.0% 0.056 164.0)` |       101.9 |               0.0 |

#### teal: Ixia viridiflora jade, **accent** (h 180 → 190)

| Token      | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ---------- | --------- | -------------------------- | ----------: | ----------------: |
| `teal-50`  | `#e9fcf7` | `oklch(97.5% 0.021 180.0)` |         0.0 |            −102.6 |
| `teal-100` | `#d3f7ef` | `oklch(94.8% 0.039 181.0)` |         0.0 |             −97.1 |
| `teal-200` | `#b2eee3` | `oklch(90.5% 0.062 182.0)` |        14.5 |             −88.7 |
| `teal-300` | `#86dcce` | `oklch(83.5% 0.086 183.0)` |        26.9 |             −75.6 |
| `teal-400` | `#62d0c2` | `oklch(79.0% 0.104 184.0)` |        34.7 |             −67.3 |
| `teal-500` | `#00a497` | `oklch(64.5% 0.114 185.0)` |        57.4 |             −43.8 |
| `teal-600` | `#008077` | `oklch(54.0% 0.095 186.0)` |        72.9 |             −28.3 |
| `teal-700` | `#006d65` | `oklch(48.0% 0.084 187.0)` |        80.5 |             −20.8 |
| `teal-800` | `#005550` | `oklch(40.5% 0.071 188.0)` |        89.3 |             −12.4 |
| `teal-900` | `#00403d` | `oklch(33.5% 0.058 189.0)` |        96.4 |               0.0 |
| `teal-950` | `#002b29` | `oklch(26.0% 0.045 190.0)` |       101.9 |               0.0 |

#### cyan (h 208 → 218)

| Token      | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ---------- | --------- | -------------------------- | ----------: | ----------------: |
| `cyan-50`  | `#e8fbfe` | `oklch(97.5% 0.020 208.0)` |         0.0 |            −102.3 |
| `cyan-100` | `#d2f5fb` | `oklch(94.8% 0.037 209.0)` |         0.0 |             −96.6 |
| `cyan-200` | `#b2ebf6` | `oklch(90.5% 0.060 210.0)` |        15.0 |             −88.2 |
| `cyan-300` | `#86d8e7` | `oklch(83.5% 0.083 211.0)` |        27.5 |             −74.9 |
| `cyan-400` | `#64cce0` | `oklch(79.0% 0.100 212.0)` |        35.0 |             −67.0 |
| `cyan-500` | `#009fb6` | `oklch(64.5% 0.113 213.0)` |        58.1 |             −43.1 |
| `cyan-600` | `#007c90` | `oklch(54.0% 0.095 214.0)` |        73.4 |             −27.8 |
| `cyan-700` | `#00697b` | `oklch(48.0% 0.085 215.0)` |        81.0 |             −20.3 |
| `cyan-800` | `#005262` | `oklch(40.5% 0.072 216.0)` |        89.6 |             −12.1 |
| `cyan-900` | `#003e4b` | `oklch(33.5% 0.060 217.0)` |        96.5 |               0.0 |
| `cyan-950` | `#002933` | `oklch(26.0% 0.047 218.0)` |       102.0 |               0.0 |

#### sky (h 232 → 244)

| Token     | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| --------- | --------- | -------------------------- | ----------: | ----------------: |
| `sky-50`  | `#eef9ff` | `oklch(97.5% 0.014 232.0)` |         0.0 |            −102.2 |
| `sky-100` | `#dbf2ff` | `oklch(94.8% 0.030 233.2)` |         7.3 |             −96.5 |
| `sky-200` | `#bde6ff` | `oklch(90.5% 0.055 234.4)` |        15.7 |             −87.5 |
| `sky-300` | `#8cd3fd` | `oklch(83.5% 0.092 235.6)` |        28.1 |             −74.2 |
| `sky-400` | `#6fc5f9` | `oklch(79.0% 0.112 236.8)` |        36.1 |             −65.8 |
| `sky-500` | `#0f98d8` | `oklch(64.5% 0.140 238.0)` |        58.9 |             −42.2 |
| `sky-600` | `#0076ad` | `oklch(54.0% 0.122 239.2)` |        74.0 |             −27.2 |
| `sky-700` | `#006495` | `oklch(48.0% 0.111 240.4)` |        81.4 |             −19.9 |
| `sky-800` | `#004e78` | `oklch(40.5% 0.096 241.6)` |        89.8 |             −11.9 |
| `sky-900` | `#003a5d` | `oklch(33.5% 0.081 242.8)` |        96.8 |               0.0 |
| `sky-950` | `#002641` | `oklch(26.0% 0.065 244.0)` |       102.1 |               0.0 |

#### blue (h 252 → 264)

| Token      | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ---------- | --------- | -------------------------- | ----------: | ----------------: |
| `blue-50`  | `#f1f8ff` | `oklch(97.5% 0.012 252.0)` |         0.0 |            −102.1 |
| `blue-100` | `#e2efff` | `oklch(94.8% 0.025 253.2)` |         7.8 |             −95.9 |
| `blue-200` | `#cbe2ff` | `oklch(90.5% 0.047 254.4)` |        16.0 |             −87.2 |
| `blue-300` | `#a5ccff` | `oklch(83.5% 0.083 255.6)` |        28.9 |             −73.4 |
| `blue-400` | `#8ebdff` | `oklch(79.0% 0.107 256.8)` |        36.9 |             −65.0 |
| `blue-500` | `#458cf3` | `oklch(64.5% 0.170 258.0)` |        60.4 |             −40.8 |
| `blue-600` | `#296acf` | `oklch(54.0% 0.170 259.2)` |        75.1 |             −26.0 |
| `blue-700` | `#2358b4` | `oklch(48.0% 0.156 260.4)` |        82.6 |             −18.7 |
| `blue-800` | `#1b4491` | `oklch(40.5% 0.136 261.6)` |        90.7 |             −11.0 |
| `blue-900` | `#15326f` | `oklch(33.5% 0.112 262.8)` |        97.5 |               0.0 |
| `blue-950` | `#0d204e` | `oklch(26.0% 0.088 264.0)` |       102.4 |               0.0 |

#### indigo (h 272 → 280)

| Token        | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ------------ | --------- | -------------------------- | ----------: | ----------------: |
| `indigo-50`  | `#f4f6ff` | `oklch(97.5% 0.012 272.0)` |         0.0 |            −101.6 |
| `indigo-100` | `#e8edff` | `oklch(94.8% 0.025 272.8)` |         8.0 |             −95.8 |
| `indigo-200` | `#d5deff` | `oklch(90.5% 0.046 273.6)` |        16.5 |             −86.6 |
| `indigo-300` | `#b8c6ff` | `oklch(83.5% 0.082 274.4)` |        29.5 |             −72.8 |
| `indigo-400` | `#a7b5ff` | `oklch(79.0% 0.107 275.2)` |        37.8 |             −64.1 |
| `indigo-500` | `#737ef9` | `oklch(64.5% 0.180 276.0)` |        61.8 |             −39.3 |
| `indigo-600` | `#585dd4` | `oklch(54.0% 0.180 276.8)` |        76.2 |             −25.0 |
| `indigo-700` | `#4b4db8` | `oklch(48.0% 0.166 277.6)` |        83.4 |             −18.0 |
| `indigo-800` | `#3b3a94` | `oklch(40.5% 0.144 278.4)` |        91.5 |             −10.3 |
| `indigo-900` | `#2d2a71` | `oklch(33.5% 0.119 279.2)` |        98.0 |               0.0 |
| `indigo-950` | `#1d1b4f` | `oklch(26.0% 0.094 280.0)` |       102.6 |               0.0 |

#### violet: supporting colour, charts/data viz only (h 298 → 302)

| Token        | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ------------ | --------- | -------------------------- | ----------: | ----------------: |
| `violet-50`  | `#f8f5ff` | `oklch(97.5% 0.014 298.0)` |         0.0 |            −101.7 |
| `violet-100` | `#f0eaff` | `oklch(94.8% 0.029 298.4)` |         8.2 |             −95.5 |
| `violet-200` | `#e4d9ff` | `oklch(90.5% 0.053 298.8)` |        16.7 |             −86.4 |
| `violet-300` | `#d1bbff` | `oklch(83.5% 0.096 299.2)` |        30.7 |             −71.5 |
| `violet-400` | `#c6a8ff` | `oklch(79.0% 0.125 299.6)` |        38.9 |             −62.9 |
| `violet-500` | `#9f70e7` | `oklch(64.5% 0.175 300.0)` |        62.6 |             −38.5 |
| `violet-600` | `#814fc3` | `oklch(54.0% 0.175 300.4)` |        76.9 |             −24.3 |
| `violet-700` | `#6e40a8` | `oklch(48.0% 0.161 300.8)` |        84.1 |             −17.3 |
| `violet-800` | `#573087` | `oklch(40.5% 0.140 301.2)` |        91.9 |             −10.0 |
| `violet-900` | `#422367` | `oklch(33.5% 0.115 301.6)` |        98.2 |               0.0 |
| `violet-950` | `#2d1548` | `oklch(26.0% 0.091 302.0)` |       102.7 |               0.0 |

#### pink: orchid magenta (h 344 → 334)

| Token      | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ---------- | --------- | -------------------------- | ----------: | ----------------: |
| `pink-50`  | `#fff3f9` | `oklch(97.5% 0.015 344.0)` |         0.0 |            −101.4 |
| `pink-100` | `#ffe5f4` | `oklch(94.8% 0.033 343.0)` |         8.8 |             −94.9 |
| `pink-200` | `#ffcfec` | `oklch(90.5% 0.065 342.0)` |        17.8 |             −85.2 |
| `pink-300` | `#fbacdf` | `oklch(83.5% 0.112 341.0)` |        31.5 |             −70.7 |
| `pink-400` | `#f497d6` | `oklch(79.0% 0.136 340.0)` |        39.7 |             −62.1 |
| `pink-500` | `#ce5eaf` | `oklch(64.5% 0.170 339.0)` |        63.0 |             −38.2 |
| `pink-600` | `#a93d90` | `oklch(54.0% 0.170 338.0)` |        77.2 |             −24.1 |
| `pink-700` | `#91317d` | `oklch(48.0% 0.156 337.0)` |        84.0 |             −17.4 |
| `pink-800` | `#732364` | `oklch(40.5% 0.136 336.0)` |        91.8 |             −10.0 |
| `pink-900` | `#57194d` | `oklch(33.5% 0.112 335.0)` |        98.1 |               0.0 |
| `pink-950` | `#3c0e35` | `oklch(26.0% 0.088 334.0)` |       102.5 |               0.0 |

#### rose: Ixia 'Mabel' cerise (h 10 → 358)

| Token      | Hex       | OKLCH                      | Lc on white | Lc on neutral-950 |
| ---------- | --------- | -------------------------- | ----------: | ----------------: |
| `rose-50`  | `#fff4f5` | `oklch(97.5% 0.012 10.0)`  |         0.0 |            −101.7 |
| `rose-100` | `#ffe7ea` | `oklch(94.8% 0.027 8.8)`   |         8.4 |             −95.3 |
| `rose-200` | `#ffd2d9` | `oklch(90.5% 0.051 7.6)`   |        17.5 |             −85.6 |
| `rose-300` | `#ffafbf` | `oklch(83.5% 0.095 6.4)`   |        31.2 |             −71.0 |
| `rose-400` | `#ff96af` | `oklch(79.0% 0.128 5.2)`   |        39.7 |             −62.1 |
| `rose-500` | `#e45181` | `oklch(64.5% 0.185 4.0)`   |        62.9 |             −38.2 |
| `rose-600` | `#be2c65` | `oklch(54.0% 0.185 2.8)`   |        76.7 |             −24.5 |
| `rose-700` | `#a42057` | `oklch(48.0% 0.170 1.6)`   |        83.5 |             −17.9 |
| `rose-800` | `#831445` | `oklch(40.5% 0.148 0.4)`   |        91.2 |             −10.6 |
| `rose-900` | `#640d35` | `oklch(33.5% 0.122 359.2)` |        97.5 |               0.0 |
| `rose-950` | `#450624` | `oklch(26.0% 0.096 358.0)` |       102.2 |               0.0 |

`white` `#ffffff` and `black` `#000000` are also available.

---

## B. Semantic tokens

All semantic tokens use the `--ixia-` prefix and resolve through `light-dark()`. They are exposed to Tailwind as `--color-*` (for example `bg-brand-default`).

### Role mapping: `brand`, `accent`, `error`, `info`, `success`, `warning`

All six roles share one step pattern. Only the family changes:

| Role      | Family   | Rationale                                               |
| --------- | -------- | ------------------------------------------------------- |
| `brand`   | `orange` | Ixia maculata apricot-coral                             |
| `accent`  | `teal`   | Ixia viridiflora jade, complementary to the brand       |
| `error`   | `red`    | Crimson, hue-separated from the brand                   |
| `info`    | `blue`   | Clearly distinct from the teal accent and green success |
| `success` | `green`  | Distinct from teal (35° apart)                          |
| `warning` | `amber`  | Ochre/amber. Orange is reserved for the brand           |

| Token suffix          | Light     | Dark          | Purpose                                      |
| --------------------- | --------- | ------------- | -------------------------------------------- |
| `-default`            | 600       | 400           | Interactive fill; coloured UI text and icons |
| `-muted`              | 700       | 300           | Hover/pressed fill; secondary coloured text  |
| `-subtle`             | 50        | 950           | Ghost/outline hover background               |
| `-on-default`         | `white`   | `neutral-950` | Label on `-default` / `-muted` fills         |
| `-container`          | 100       | 950           | Alerts, callouts, tinted cards               |
| `-container-high`     | 200       | 900           | Selected or emphasised container             |
| `-on-container`       | 900       | 100           | Text and icons on containers                 |
| `-on-container-muted` | 700       | 300           | Secondary text on containers                 |
| `-border`             | 300       | 700           | Decorative outline (Lc ≥ 15)                 |
| `-border-strong`      | 500       | 500           | Meaningful boundary (Lc ≥ 30, ≥ 3:1)         |
| `-shadow`             | 700 @ 25% | 400 @ 35%     | Coloured glow                                |

### `neutral` role

| Token                               | Light               | Dark          |
| ----------------------------------- | ------------------- | ------------- |
| `--ixia-neutral-default`            | `neutral-800`       | `neutral-100` |
| `--ixia-neutral-muted`              | `neutral-900`       | `neutral-200` |
| `--ixia-neutral-subtle`             | `neutral-100`       | `neutral-800` |
| `--ixia-neutral-on-default`         | `white`             | `neutral-950` |
| `--ixia-neutral-container`          | `neutral-100`       | `neutral-800` |
| `--ixia-neutral-container-high`     | `neutral-200`       | `neutral-700` |
| `--ixia-neutral-on-container`       | `neutral-900`       | `neutral-50`  |
| `--ixia-neutral-on-container-muted` | `neutral-600`       | `neutral-300` |
| `--ixia-neutral-border`             | `neutral-400`       | `neutral-600` |
| `--ixia-neutral-border-strong`      | `neutral-500`       | `neutral-400` |
| `--ixia-neutral-shadow`             | `neutral-950` @ 18% | `black` @ 35% |

### Surfaces and global tokens

| Token                          | Light                                              | Dark                             |
| ------------------------------ | -------------------------------------------------- | -------------------------------- |
| `--ixia-surface-background`    | `neutral-50`                                       | `neutral-950`                    |
| `--ixia-surface`               | `white`                                            | `neutral-900`                    |
| `--ixia-surface-2`             | `white`                                            | `neutral-800`                    |
| `--ixia-surface-3`             | `white`                                            | `neutral-700`                    |
| `--ixia-surface-low`           | `neutral-100`                                      | `black`                          |
| `--ixia-on-surface`            | `neutral-900`                                      | `neutral-50`                     |
| `--ixia-on-surface-variant`    | `neutral-700`                                      | `neutral-200`                    |
| `--ixia-on-surface-muted`      | `neutral-600`                                      | `neutral-300`                    |
| `--ixia-on-surface-disabled`   | `neutral-400`                                      | `neutral-600`                    |
| `--ixia-border`                | `neutral-300`                                      | `neutral-600`                    |
| `--ixia-border-strong`         | `neutral-500`                                      | `neutral-400`                    |
| `--ixia-surface-inverse`       | `neutral-900`                                      | `neutral-100`                    |
| `--ixia-on-surface-inverse`    | `neutral-50`                                       | `neutral-900`                    |
| `--ixia-surface-focus-ring`    | `= brand-default` (`orange-600`)                   | `= brand-default` (`orange-400`) |
| `--ixia-scrim`                 | `neutral-950` @ 80%                                | `black` @ 80%                    |
| `--ixia-shadow`                | `neutral-950` @ 30%                                | `black` @ 40%                    |
| `--ixia-shadow-strong`         | `neutral-950` @ 45%                                | `black` @ 60%                    |
| `--ixia-brand-gradient`        | `orange-800 → orange-500 → amber-400 → yellow-300` | same                             |
| `--ixia-brand-gradient-subtle` | `orange-500 16% → amber-400 12% → yellow-300 8%`   | same                             |

### Alternative brand themes

To use one, import it after `input.css` and set `data-brand="<theme>"` (for example `data-brand="venus"`) on `<html>` or on any subtree. Each file overrides only the `brand-*` and `accent-*` tokens, then re-binds their Tailwind `--color-*` aliases and the focus ring inside that scope. Every brand/accent pair in the matrix below was re-checked for every theme, in both light and dark modes, against APCA and WCAG AA. All of them pass.

| Theme              | Inspiration                                        | File                     | Brand    | Accent    |
| ------------------ | -------------------------------------------------- | ------------------------ | -------- | --------- |
| Maculata (default) | _I. maculata_: apricot petals, maroon eye          | `input.css`              | `orange` | `teal`    |
| Mabel              | _I._ 'Mabel': cerise-carmine                       | `themes/mabel.css`       | `rose`   | `teal`    |
| Viridiflora        | _I. viridiflora_: jade petals, black-violet eye    | `themes/viridiflora.css` | `teal`   | `orange`  |
| Hogarth            | _I._ 'Hogarth': cream-gold petals, carmine eye     | `themes/hogarth.css`     | `yellow` | `rose`    |
| Venus              | _I._ 'Venus': orchid-magenta, green foliage        | `themes/venus.css`       | `pink`   | `emerald` |
| Monadelpha         | _I. monadelpha_: blue-violet petals, turquoise eye | `themes/monadelpha.css`  | `indigo` | `teal`    |

Theme-specific notes:

- **Hogarth** cannot use the standard 600/400 pattern because yellow sits on a lifted ladder. In light mode it uses `yellow-800` for fills and text (`900` on hover, `700` for strong borders), so the light brand reads as mustard-ochre. Dark mode uses the true yellow, `yellow-500`, with a `neutral-950` label. Its brand hue is close to the `warning` amber, so warnings must always carry an icon or label.
- **Monadelpha**'s indigo brand sits about 18° from the `info` blue. Info messages should rely on an icon and label, not hue alone.
- No red-flowered Ixia was used as a brand, because it would collide with `error`.

---

## C. Accessibility matrix

Lc is APCA (text on background; negative means light text on a dark background). WCAG is the 2.x ratio. The Storybook **Color Palette/{Theme} → Accessibility Matrix** stories compute every pair live in both light and dark modes.

### Role pairs: worst case across all seven roles

| Foreground             | Background           | Light Lc / WCAG | Dark Lc / WCAG | Target      | Usage                          | Recommended     |
| ---------------------- | -------------------- | --------------- | -------------- | ----------- | ------------------------------ | --------------- |
| `*-on-default`         | `*-default`          | 77.8 / 4.75     | 64.1 / 9.28    | Lc 60       | Filled button / badge label    | Yes             |
| `*-on-default`         | `*-muted`            | 85.3 / 6.16     | 72.2 / 10.92   | Lc 60       | Hover label                    | Yes             |
| `*-default`            | `surface`            | 72.3 / 4.75     | 61.4 / 8.23    | Lc 60       | Coloured UI text, links, icons | Yes             |
| `*-default`            | `surface-background` | 69.5 / 4.56     | 62.7 / 9.28    | Lc 60       | Coloured UI text               | Yes             |
| `*-muted`              | `surface`            | 80.1 / 6.16     | 70.0 / 9.69    | Lc 60       | Secondary coloured text        | Yes             |
| `*-on-container`       | `*-container`        | 86.1 / 10.10    | 92.8 / 12.47   | Lc 75       | Alert body text                | Yes             |
| `*-on-container`       | `*-container-high`   | 77.3 / 8.94     | 88.6 / 7.83    | Lc 75       | Selected container text        | Yes             |
| `*-on-container`       | `*-subtle`           | 91.6 / 10.83    | 92.8 / 12.47   | Lc 75       | Outline hover text             | Yes             |
| `*-on-container-muted` | `*-container`        | 70.0 / 4.83     | 68.6 / 9.19    | Lc 60       | Alert description              | Yes             |
| `*-border-strong`      | `surface`            | 57.3 / 3.09     | 37.1 / 4.59    | Lc 30 + 3:1 | Control boundary               | Yes (non-text)  |
| `*-border`             | `*-container`        | 17.6 / 1.39     | 15.7 / 2.23    | Lc 15       | Alert outline                  | Decorative only |

### Brand (orange) in detail

| Foreground                 | Background        | Light Lc | Light WCAG | Dark Lc | Dark WCAG |
| -------------------------- | ----------------- | -------: | ---------: | ------: | --------: |
| `brand-on-default`         | `brand-default`   |    −81.4 |       5.39 |    64.6 |      9.37 |
| `brand-on-default`         | `brand-muted`     |    −88.1 |       6.95 |    72.6 |     11.00 |
| `brand-default`            | `surface`         |     76.0 |       5.39 |   −61.9 |      8.32 |
| `brand-on-container`       | `brand-container` |     86.5 |      10.70 |   −92.8 |     13.67 |
| `brand-on-container-muted` | `brand-container` |     72.3 |       5.93 |   −69.1 |      9.38 |
| `brand-border-strong`      | `surface`         |     62.0 |       3.52 |   −37.9 |      4.74 |
| `surface-focus-ring`       | `surface`         |     76.0 |       5.39 |   −61.9 |      8.32 |

### Surfaces

| Foreground            | Background           | Light Lc / WCAG | Dark Lc / WCAG   | Target          | Recommended                                       |
| --------------------- | -------------------- | --------------- | ---------------- | --------------- | ------------------------------------------------- |
| `on-surface`          | `surface-background` | 100.8 / 16.02   | −104.2 / 18.06   | Lc 90 preferred | Yes (preferred)                                   |
| `on-surface`          | `surface`            | 103.6 / 16.68   | −102.9 / 16.02   | Lc 90 preferred | Yes (preferred)                                   |
| `on-surface`          | `surface-2`          | 103.6 / 16.68   | −99.4 / 12.47    | Lc 90 preferred | Yes (preferred)                                   |
| `on-surface`          | `surface-3`          | 103.6 / 16.68   | −89.7 / 7.83     | Lc 75           | Yes                                               |
| `on-surface-variant`  | `surface`            | 88.2 / 8.16     | −91.6 / 13.72    | Lc 75           | Yes                                               |
| `on-surface-variant`  | `surface-3`          | 88.2 / 8.16     | −78.4 / 6.70     | Lc 75           | Yes                                               |
| `on-surface-muted`    | `surface-background` | 73.5 / 5.09     | −82.9 / 13.30    | Lc 60           | Yes                                               |
| `on-surface-muted`    | `surface-3`          | 76.4 / 5.30     | −68.5 / 5.77     | Lc 60           | Yes                                               |
| `on-surface-inverse`  | `surface-inverse`    | −102.9 / 16.02  | 97.3 / 15.22     | Lc 75           | Yes                                               |
| `border-strong`       | `surface`            | 60.0 / 3.26     | −63.4 / 8.61     | Lc 30 + 3:1     | Yes (non-text)                                    |
| `border-strong`       | `surface-3`          | 60.0 / 3.26     | −50.2 / 4.21     | Lc 30 + 3:1     | Yes (non-text)                                    |
| `border`              | `surface`            | 20.0 / 1.41     | −23.5 / 3.15     | Lc 15           | Decorative only                                   |
| `border`              | `surface-3`          | 20.0 / 1.41     | **−10.4 / 1.54** | Lc 15           | **No (dark).** Use `border-strong` on `surface-3` |
| `on-surface-disabled` | `surface`            | 37.2 / 1.94     | −23.5 / 3.15     | Exempt          | **Disabled only.** Never for essential text       |

### Combinations flagged: do not use for text

| Foreground             | Background                        |    Lc |  WCAG | Why                                                                        |
| ---------------------- | --------------------------------- | ----: | ----: | -------------------------------------------------------------------------- |
| `orange-500` (any 500) | `white`                           |  62.0 |  3.52 | Fails WCAG AA 4.5:1 and Lc 75. Large text and icons only                   |
| `green-500`            | `white`                           |  57.3 |  3.09 | Below Lc 60. Icons and large text only                                     |
| `white`                | `orange-500`                      | −67.5 |  3.52 | Passes APCA, fails WCAG AA. Use `brand-default` (600) for filled buttons   |
| `neutral-950`          | `orange-500`                      |  41.3 |  5.34 | Below Lc 45                                                                |
| any 300/400            | `white`                           | 30–40 | < 2.1 | Decorative / borders only                                                  |
| `yellow-500`           | `white`                           |  35.4 |  1.88 | Never as text. As a fill, use `neutral-950` text (Lc 67.8)                 |
| `white`                | `yellow-500`                      | −39.6 |  1.88 | Never                                                                      |
| `orange-600` (any 600) | `neutral-950`                     | −25.2 |  3.49 | Light-mode steps do not work as text on dark                               |
| `orange-400`           | `neutral-800` (`surface-2`, dark) | −58.4 |  6.47 | Below Lc 60. Use `*-muted` (300) for coloured text on raised dark surfaces |
| `orange-400`           | `neutral-700` (`surface-3`, dark) | −48.8 |  4.07 | Large text only                                                            |
| `orange-600`           | `red-600`                         |   0.0 |  1.04 | Brand and error have the same lightness. Never put one on the other        |

---

## D. CSS variables

The complete, implementation-ready block lives in [src/styles/input.css](../src/styles/input.css) (`:root`). It follows this structure:

```css
:root {
  color-scheme: light dark;
  /* primitives: hex, generated from OKLCH */
  --orange-600: #b44900;
  /* … every family, 50–950 … */

  /* semantic: light-dark(light, dark) */
  --ixia-brand-default: light-dark(var(--orange-600), var(--orange-400));
  --ixia-brand-on-default: light-dark(var(--white), var(--neutral-950));
  /* … */
}
[data-theme='light'] {
  color-scheme: light;
}
[data-theme='dark'] {
  color-scheme: dark;
}
```

Any element with `data-theme` re-resolves every `--ixia-*` token for its subtree. The Storybook stories use this to render both themes side by side.

---

## E. Design rationale

### 1. Why this palette represents Ixia

Ixia (the African corn lily) has three signature looks: the apricot-to-coral petals of _I. maculata_ with a dark maroon eye, the cerise _I._ 'Mabel', and the rare jade-turquoise _I. viridiflora_ with a near-black purple centre. The palette borrows from these:

- **Hue drift along the scale.** Warm families start yellower at 50 and grow redder toward 950 (orange runs from h 64 to h 32). Like a petal, light tints read as sunlit apricot and the deep steps settle into the rust-maroon of the flower's eye.
- **Botanical chroma.** Peak chroma sits at 500–600 and is pulled back at 300–400 (×0.66 / ×0.8 of peak). Light steps stay soft and petal-like instead of neon.
- **Warm stone neutrals.** The neutrals carry a slight apricot tint (h ≈ 60, C ≤ 0.013), so greys feel related to the brand without looking beige.
- **Complementary jade accent.** Teal comes from _I. viridiflora_ and sits roughly opposite the coral brand on the hue wheel.

### 2. Primary brand colour

**`orange`, tuned toward apricot-coral (Ixia maculata).** `brand-default` is `orange-600` `#b44900` in light mode, which carries white labels at Lc −81 / 5.39:1. In dark mode it is `orange-400` `#ffa065`, which carries `neutral-950` labels at Lc 65 / 9.37:1. The most recognisable brand swatch, `orange-500` `#df6400`, is used for strong borders, charts, and the gradient. It is not used behind small text because it fails WCAG AA there.

### 3. Why purple is not the brand

The previous palette used violet, which has no link to Ixia's warm identity and fits generic "tech" branding. Purple appears in Ixia only as the small dark eye of _viridiflora_. It survives here as one supporting family, `violet`, intended for data visualisation, and as the dark start of the Viridiflora gradient. The previous `purple` and `fuchsia` families were removed to cut redundancy.

### 4. How the families relate

- All chromatic families share one OKLCH lightness ladder, so any `x-600` swaps for any `y-600` with near-identical contrast.
- Hues are spaced about 15–30° apart: rose 4 → red 24 → orange 48 → amber 71 → yellow 85 → lime 130 → green 150 → emerald 165 → teal 185 → cyan 213 → sky 238 → blue 258 → indigo 276 → violet 300 → pink 339. Adjacent families stay distinguishable.
- Peak chroma is capped per family (0.11–0.205), so cool hues don't outshout warm ones. Cool families drift slightly toward their warmer neighbour at the dark end (blue → indigo), which keeps dark steps rich.
- Families that can't reach their target chroma in sRGB are gamut-mapped by reducing chroma only. Lightness and hue never change, so contrast is unaffected.

### 5. Designed around APCA

The lightness ladder came first. Steps were placed so that each one hits an APCA band against both white and `neutral-950`:

- 600 → Lc ≈ 75 on white, and white text on it at Lc ≈ −78 to −81 (filled buttons)
- 700 → Lc ≈ 80+ on white (body text minimum)
- 900 → Lc ≈ 96+ on white (preferred)
- 400 → Lc ≈ −62 to −68 on dark, and `neutral-950` text on it at Lc ≈ 64–69
- 300 / 100 → Lc 70+ / 90+ on dark

The 600 step was then darkened from 55.5% to 54% L so that the same pairs also pass WCAG AA (`green-600` had been 4.46:1). A script checked all 210 semantic pairs in both themes, plus every brand/accent pair in each alternative theme. One pair fails, and it is documented above: `border` on `surface-3` in dark mode.

### 6. How the semantic tokens were chosen

- Each role uses the **same step pattern**, so a component that works for `brand` works for `error` without retesting.
- Hover states always **increase** label contrast. In light mode the hover goes 600 → 700. In dark mode it goes 400 → 300.
- **Dark mode is not an inversion.** Fills move to 400 with near-black labels, containers move to 950/900 (not 900/800, to keep separation from `surface`), and borders move to 700 so they stay visible on deep tints.
- **Info uses blue, not cyan.** Cyan sat too close to the teal accent.
- **Warning uses amber, not orange.** Orange is reserved for the brand, so warnings never look like primary actions.
- **Surfaces in dark mode** step 950 → 900 → 800 → 700. Text tokens move up the neutral scale (50 / 200 / 300) to keep Lc ≥ 75 / 60 even on `surface-3`.
- Light `on-surface-muted` moved from 400 to `neutral-600` (Lc 76). The old value (Lc ≈ 46) did not meet any text threshold.

### 7. Text vs background vs decorative

| Use                          | Light theme                               | Dark theme                       |
| ---------------------------- | ----------------------------------------- | -------------------------------- |
| Body text                    | neutral 700–950, chromatic 700–950        | neutral 50–300, chromatic 50–200 |
| UI text / links / labels     | chromatic 600+                            | chromatic 300–400                |
| Large text, icons            | 500+                                      | 400–500                          |
| Interactive fills            | 600 (hover 700)                           | 400 (hover 300)                  |
| Backgrounds / containers     | 50–200                                    | 900–950                          |
| Meaningful borders           | 500                                       | 400–500                          |
| Decorative borders, dividers | 300 (neutral 300–400)                     | 600–700                          |
| Charts / data viz            | 400–600 of any family, including `violet` | same                             |

### 8. Limitations and usage rules

1. **Brand vs error.** `orange-600` and `red-600` have identical lightness (Lc 0 against each other). Users with protan/deutan colour vision may not tell them apart. Destructive actions must always include an icon and/or explicit label, and must never rely on colour alone. The Mabel theme (rose brand) has the same constraint.
2. **Dark-mode coloured text on raised surfaces.** `*-default` (400) reaches Lc 61–66 on `surface` and `surface-background` but only about 58 on `surface-2`. On `surface-2` and `surface-3`, use `*-muted` (300) for coloured text.
3. **Dark `surface-3`** is too close to `border` for dividers (Lc −10). Use `border-strong`, or spacing, on `surface-3`.
4. **Disabled text** (`on-surface-disabled`) intentionally fails contrast. It is exempt under WCAG, but never put essential information in it.
5. **Yellow** has a lifted ladder. Its text-safe step on light is 700, not 600.
6. **Dark-mode fills (400)** carry labels at Lc 64–69. That is enough for ≥ 14px semibold or ≥ 16px regular, but not for tiny text such as captions under 12px.
7. APCA was calculated with APCA-W3 0.0.98G-4g against sRGB hex. Alpha tokens (shadows, scrim, subtle gradient) were not contrast-tested and are decorative.
8. The theme storage key in `src/hooks/theme/theme.constants.ts` is still `dawn-ui-theme`. It was not renamed so that users keep their saved theme preference.
