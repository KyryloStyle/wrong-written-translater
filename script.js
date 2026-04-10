/* ─── Keyboard layout maps ──────────────────────────────────────────────────── *
 * Each map represents the character produced when a physical QWERTY key is
 * pressed while that keyboard layout is active. Keys are QWERTY positions.
 */
const LAYOUTS = {
  ru: {
    q:'й', w:'ц', e:'у', r:'к', t:'е', y:'н', u:'г', i:'ш', o:'щ', p:'з',
    a:'ф', s:'ы', d:'в', f:'а', g:'п', h:'р', j:'о', k:'л', l:'д',
    z:'я', x:'ч', c:'с', v:'м', b:'и', n:'т', m:'ь',
  },
  de: {
    q:'q', w:'w', e:'e', r:'r', t:'t', y:'z', u:'u', i:'i', o:'o', p:'p',
    a:'a', s:'s', d:'d', f:'f', g:'g', h:'h', j:'j', k:'k', l:'l',
    z:'y', x:'x', c:'c', v:'v', b:'b', n:'n', m:'m',
  },
  ua: {
    q:'й', w:'ц', e:'у', r:'к', t:'е', y:'н', u:'г', i:'ш', o:'щ', p:'з',
    a:'ф', s:'і', d:'в', f:'а', g:'п', h:'р', j:'о', k:'л', l:'д',
    z:'я', x:'ч', c:'с', v:'м', b:'и', n:'т', m:'ь',
  },
  en: {
    q:'q', w:'w', e:'e', r:'r', t:'t', y:'y', u:'u', i:'i', o:'o', p:'p',
    a:'a', s:'s', d:'d', f:'f', g:'g', h:'h', j:'j', k:'k', l:'l',
    z:'z', x:'x', c:'c', v:'v', b:'b', n:'n', m:'m',
  },
};

/* Pre-compute reverse maps: character → QWERTY key position.
 * Building these once avoids an O(n) loop per character on every keystroke.
 */
const REVERSE_MAPS = Object.fromEntries(
  Object.entries(LAYOUTS).map(([lang, map]) => [
    lang,
    Object.fromEntries(Object.entries(map).map(([key, char]) => [char, key])),
  ])
);

/* ─── Scroll gradient constants ─────────────────────────────────────────────── */
// Detect dark mode once at load so gradient targets the correct end colour.
const PREFERS_DARK = window.matchMedia('(prefers-color-scheme: dark)').matches;

const GRADIENT_START_TOP    = PREFERS_DARK ? [30,  27,  75]  : [221, 214, 254]; // dark #1e1b4b | light #ddd6fe
const GRADIENT_START_BOTTOM = PREFERS_DARK ? [14,  13,  50]  : [191, 219, 254]; // dark #0e0d32 | light #bfdbfe
const GRADIENT_END_COLOR    = PREFERS_DARK ? [15,  14,  35]  : [245, 244, 255]; // dark #0f0e23 | light #f5f4ff
const GRADIENT_SPEED        = 2;               // how fast the gradient fades to the page background

/* ─── State ──────────────────────────────────────────────────────────────────── */
let inputLang  = 'ru';
let outputLang = 'en';

/* ─── DOM references ─────────────────────────────────────────────────────────── */
const inputButtons  = document.querySelectorAll('.input-lang .lang-btn');
const outputButtons = document.querySelectorAll('.output-lang .lang-btn');
const inputField    = document.getElementById('input-text');
const outputField   = document.getElementById('output-text');
const charCounter   = document.getElementById('char-counter');
const copyBtn       = document.getElementById('copy-btn');
const swapBtn       = document.getElementById('swap-btn');

/* ─── Core translation logic ─────────────────────────────────────────────────── */

/**
 * Converts a single character from inputLang layout to outputLang layout.
 * Preserves original casing. Returns the character unchanged if it is not
 * part of the input layout (e.g. digits, punctuation, spaces).
 *
 * @param {string} char - A single character from the input text.
 * @returns {string} The converted character.
 */
function convertChar(char) {
  const lower   = char.toLowerCase();
  const key     = REVERSE_MAPS[inputLang][lower];
  if (!key) return char;

  const newChar = LAYOUTS[outputLang][key];
  if (!newChar) return char;

  return char === lower ? newChar : newChar.toUpperCase();
}

/**
 * Converts the full input textarea value and writes the result to the
 * output textarea. Also updates the copy button's disabled state.
 */
function convertText() {
  const text      = inputField.value;
  const converted = text.split('').map(convertChar).join('');

  outputField.value = converted;
  copyBtn.disabled  = converted.length === 0;
}

/* ─── UI state updates ───────────────────────────────────────────────────────── */

/**
 * Updates aria-pressed on all language buttons to reflect current state.
 */
function updateActiveButtons() {
  inputButtons.forEach(btn => {
    const isActive = btn.dataset.lang === inputLang;
    btn.setAttribute('aria-pressed', String(isActive));
  });

  outputButtons.forEach(btn => {
    const isActive = btn.dataset.lang === outputLang;
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

/**
 * Updates the character counter text below the input field.
 */
function updateCharCounter() {
  const count = inputField.value.length;
  charCounter.textContent = count === 1 ? '1 character' : `${count} characters`;
}

/* ─── Clipboard ──────────────────────────────────────────────────────────────── */

/**
 * Copies the output text to the clipboard and gives brief visual feedback.
 */
async function copyToClipboard() {
  const text = outputField.value;
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch {
    // Fallback for browsers where the Clipboard API is unavailable
    outputField.select();
    document.execCommand('copy');
  }
}

/* ─── Event handlers ─────────────────────────────────────────────────────────── */

inputButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    inputLang = btn.dataset.lang;
    updateActiveButtons();
    convertText();
  });
});

outputButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    outputLang = btn.dataset.lang;
    updateActiveButtons();
    convertText();
  });
});

inputField.addEventListener('input', () => {
  updateCharCounter();
  convertText();
});

copyBtn.addEventListener('click', copyToClipboard);

swapBtn.addEventListener('click', () => {
  [inputLang, outputLang] = [outputLang, inputLang];
  updateActiveButtons();
  convertText();
});

/* ─── Scroll gradient animation ─────────────────────────────────────────────── */

/**
 * Linear interpolation between two numeric values.
 *
 * @param {number} a - Start value.
 * @param {number} b - End value.
 * @param {number} t - Progress [0, 1].
 * @returns {number}
 */
function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

/**
 * Converts an RGB array and a progress value to a CSS rgb() string.
 *
 * @param {number[]} startColor - [r, g, b]
 * @param {number[]} endColor   - [r, g, b]
 * @param {number}   t          - Progress [0, 1]
 * @returns {string}
 */
function interpolatedColor(startColor, endColor, t) {
  const r = lerp(startColor[0], endColor[0], t);
  const g = lerp(startColor[1], endColor[1], t);
  const b = lerp(startColor[2], endColor[2], t);
  return `rgb(${r}, ${g}, ${b})`;
}

let scrollRafId = null;

function applyScrollGradient() {
  scrollRafId = null;

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Guard: page is not scrollable — nothing to do
  if (docHeight <= 0) return;

  const rawFraction   = Math.min(window.scrollY / docHeight, 1);
  const scrollFraction = Math.min(rawFraction * GRADIENT_SPEED, 1);

  const topColor    = interpolatedColor(GRADIENT_START_TOP,    GRADIENT_END_COLOR, scrollFraction);
  const bottomColor = interpolatedColor(GRADIENT_START_BOTTOM, GRADIENT_END_COLOR, scrollFraction);

  document.body.style.background = `linear-gradient(135deg, ${topColor}, ${bottomColor})`;
}

window.addEventListener('scroll', () => {
  // Use requestAnimationFrame to throttle to the display refresh rate
  if (scrollRafId === null) {
    scrollRafId = requestAnimationFrame(applyScrollGradient);
  }
}, { passive: true });

/* ─── Initialisation ─────────────────────────────────────────────────────────── */
updateActiveButtons();
updateCharCounter();
convertText();
