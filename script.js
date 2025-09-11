let inputLang = 'ru';
let outputLang = 'en';

const inputButtons = document.querySelectorAll('.input-lang button');
const outputButtons = document.querySelectorAll('.output-lang button');
const inputField = document.getElementById('input-text');
const outputField = document.getElementById('output-text');

const layouts = {
  ru: { q:'й', w:'ц', e:'у', r:'к', t:'е', y:'н', u:'г', i:'ш', o:'щ', p:'з', a:'ф', s:'ы', d:'в', f:'а', g:'п', h:'р', j:'о', k:'л', l:'д', z:'я', x:'ч', c:'с', v:'м', b:'и', n:'т', m:'ь' },
  de: { q:'q', w:'w', e:'e', r:'r', t:'t', y:'z', u:'u', i:'i', o:'o', p:'p', a:'a', s:'s', d:'d', f:'f', g:'g', h:'h', j:'j', k:'k', l:'l', z:'y', x:'x', c:'c', v:'v', b:'b', n:'n', m:'m' },
  ua: { q:'й', w:'ц', e:'у', r:'к', t:'е', y:'н', u:'г', i:'ш', o:'щ', p:'з', a:'ф', s:'і', d:'в', f:'а', g:'п', h:'р', j:'о', k:'л', l:'д', z:'я', x:'ч', c:'с', v:'м', b:'и', n:'т', m:'ь' },
  en: { q:'q', w:'w', e:'e', r:'r', t:'t', y:'y', u:'u', i:'i', o:'o', p:'p', a:'a', s:'s', d:'d', f:'f', g:'g', h:'h', j:'j', k:'k', l:'l', z:'z', x:'x', c:'c', v:'v', b:'b', n:'n', m:'m' }
};

// Подсветка активных кнопок
function updateActiveButtons() {
  inputButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === inputLang));
  outputButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === outputLang));
}

// Конвертация текста с inputLang → outputLang
function convertText() {
  const text = inputField.value;
  const inputMap = layouts[inputLang];
  const outputMap = layouts[outputLang];

  const converted = text.split('').map(char => {
    const lowerChar = char.toLowerCase();
    let key = null;
    for (let k in inputMap) {
      if (inputMap[k] === lowerChar) {
        key = k;
        break;
      }
    }
    if (key) {
      const newChar = outputMap[key] || char;
      return char === char.toLowerCase() ? newChar : newChar.toUpperCase();
    }
    return char;
  }).join('');

  outputField.value = converted;
}

// Обработчики
inputButtons.forEach(btn => btn.addEventListener('click', () => {
  inputLang = btn.dataset.lang;
  updateActiveButtons();
  convertText();
}));

outputButtons.forEach(btn => btn.addEventListener('click', () => {
  outputLang = btn.dataset.lang;
  updateActiveButtons();
  convertText();
}));

inputField.addEventListener('input', convertText);

// Инициализация
updateActiveButtons();


const body = document.body;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  let scrollFraction = Math.min(scrollTop / docHeight, 1);

  const speed = 3; // увеличиваем скорость
  scrollFraction = Math.min(scrollFraction * speed, 1); // ускоряем и ограничиваем до 1

  const startTop = [251, 194, 235]; // #fbc2eb
  const startBottom = [166, 193, 238]; // #a6c1ee
  const endColor = [255, 255, 255]; // белый

  function lerp(a, b, t) {
    return Math.round(a + (b - a) * t);
  }

  const topColor = `rgb(${lerp(startTop[0], endColor[0], scrollFraction)}, ${lerp(startTop[1], endColor[1], scrollFraction)}, ${lerp(startTop[2], endColor[2], scrollFraction)})`;
  const bottomColor = `rgb(${lerp(startBottom[0], endColor[0], scrollFraction)}, ${lerp(startBottom[1], endColor[1], scrollFraction)}, ${lerp(startBottom[2], endColor[2], scrollFraction)})`;

  body.style.background = `linear-gradient(135deg, ${topColor}, ${bottomColor})`;
});

