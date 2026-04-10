# Wrong-Written Translator

A lightweight web application that fixes text typed in the wrong keyboard layout.
For example, if you type *"Ghbdtn"* when your keyboard was set to Russian instead of English — this app instantly converts it to *"Привет"*.

**Live demo:** https://kyrylostyle.github.io/wrong-written-translater/

---

## Features

- Converts text between Russian, Ukrainian, German, and English keyboard layouts
- Real-time conversion as you type
- Swap input/output languages with one click
- Copy corrected text to clipboard
- Character counter
- Fully keyboard-accessible (WCAG AA)
- Responsive — works on mobile, tablet, and desktop
- No backend, no dependencies, runs offline after first load

---

## How It Works

Each keyboard layout maps the same physical keys to different characters. This app uses pre-built layout tables to find which physical key produced a character in the *input* layout, then outputs the character that same key produces in the *output* layout.

```
Input layout:  English  →  "Ghbdtn"
Output layout: Russian  →  "Привет"
```

---

## Running Locally

No build step required — the project is plain HTML, CSS, and JavaScript.

```bash
git clone https://github.com/KyryloStyle/wrong-written-translater.git
cd wrong-written-translater
```

Then open `index.html` in any modern browser, or serve it with any static file server:

```bash
# Python (built-in)
python3 -m http.server 8080

# Node (npx)
npx serve .
```

---

## Deploying

The app is a static site — deploy it anywhere that serves static files.

**GitHub Pages:**
1. Push to the `main` branch.
2. Go to *Settings → Pages → Source → Deploy from branch → main → / (root)*.
3. The site is live at `https://<username>.github.io/<repo-name>/`.

---

## Project Structure

```
wrong-written-translater/
├── index.html     # Page structure and markup
├── style.css      # Styles, design tokens, responsive layout
├── script.js      # Layout maps, conversion logic, UI interactions
├── img/           # Flag icons and author photo
└── README.md
```

---

## Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Design tokens, responsive layout, animations |
| JavaScript (Vanilla ES2020+) | Layout conversion logic, DOM interactions |

---

## Known Limitations

- Only letter keys (a–z) are mapped. Punctuation and special characters (e.g. `[`, `]`, `;`) differ between layouts but pass through unchanged.
- The German layout only maps the Y↔Z swap (QWERTY vs QWERTZ). Umlauts (ä, ö, ü) are not yet covered.

---

## Future Improvements

- Automatic layout detection
- Punctuation and special character mappings
- Support for more layouts (Spanish, French, Polish, etc.)
- Dark mode

---

## Author

**Kyrylo Yurchenko** — Frontend Developer & Software Engineer, based in Germany

[Portfolio](https://kyrylostyle.github.io/portfolio/) · [LinkedIn](https://www.linkedin.com/in/kyrylo-yurchenko/) · kyrylo.yurchenkoo@gmail.com
