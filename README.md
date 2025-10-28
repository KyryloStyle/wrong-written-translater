# 📝 Wrong-Written Translator

A lightweight and intuitive **web application** that automatically fixes text typed in the **wrong keyboard layout**.  
For example, if you accidentally type *“Ghbdtn”* instead of *“Hello”* because your keyboard was set to Russian — this app will instantly correct it.

---

## 🚀 Live Demo
👉 [Try it here](https://kyrylostyle.github.io/Translater/)  

---

## ✨ Features

- 🔤 Instantly converts text typed in the wrong layout (e.g. Russian ↔ English)
- ⚡ Fast and works directly in the browser — no backend needed
- 🧩 Simple, minimal, and user-friendly interface
- 📱 Responsive design that works on desktop and mobile
- 💾 Lightweight — loads instantly and runs offline after the first load

---

## 🖼️ Screenshots

> 📸 **Recommended screenshots to include:**
> 1. **Main Interface** – show the input and output areas of the app.  
> 2. **Before & After Example** – demonstrate how a wrong text like *“Ghbdtn”* becomes *“Hello”*.  
> 3. *(Optional)* **Mobile View** – to highlight responsive design.

---

## 🧠 How It Works

The app listens for text input and automatically detects if the characters match the wrong layout.  
It then maps each incorrect character to its correct counterpart using a **layout conversion table** (for example, Russian → English).

Example:
```
Input: Ghbdtn
Output: Hello
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-------------|----------|
| **HTML5** | Page structure |
| **CSS3** | Styling and responsive design |
| **JavaScript (Vanilla)** | Logic for keyboard layout conversion |

---

## 🧩 Project Structure
```
wrong-written-translator/
│
├── index.html          # Main HTML page
├── style.css           # Styles and layout
├── script.js           # Core conversion logic
├── /img             # Screenshots and icons
└── README.md           # Project documentation
```

---

## ⚙️ Installation & Usage

You can run the app locally without any setup — it’s pure HTML/CSS/JS.

**Steps:**
1. Clone this repository:
   ```bash
   git clone https://github.com/KyryloStyle/Translater
2. Open index.html in your browser.

3. Start typing in the wrong layout — the app will do the rest.

---

## 💡 Future Improvements

- Add **automatic language detection**
- Support for **more keyboard layouts** (e.g., Spanish, French)
- Option to **copy fixed text** with one click
- **Dark mode** toggle

---

## 🧑‍💻 Author

**Kyrylo Yurchenko**  
Frontend Developer & Software Engineer  
📍 Based in Germany  
🌐 [Portfolio](https://kyrylostyle.github.io/portfolio/) | 💼 [LinkedIn](https://www.linkedin.com/in/kyrylo-yurchenko/) | 📧 kyrylo.yurchenkoo@gmail.com
