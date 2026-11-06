# 🪔 Happy Diwali — Interactive 3-Screen Greeting Website

A responsive, mobile-first Diwali greeting web application built with **pure HTML, CSS, and vanilla JavaScript** (zero external frameworks or runtime dependencies).

Designed with celestial glassmorphism, animated diya flame physics, interactive paper lanterns with firecracker spark bursts, personalized greetings, and sharing capabilities.

---

## ✨ Features

- **Screen 1 — Name & Sacred Diya**:
  - Multi-layered SVG Diya with animated flickering flame and warm radial glow.
  - Name input supporting keyboard (`Enter`), button click, and URL prefilling (`?name=YourName`).
  - Animated error shake validation on empty submission.
- **Screen 2 — Sacred Greeting & Grand Blessings**:
  - Personalized glowing gold greeting (`Happy Diwali, <name>!`) safely escaped using `textContent`.
  - Radiant Marathi wish: *"दिवाळीच्या हार्दिक शुभेच्छा!"*.
  - Sidewise animated firework sparklers flanking the greeting.
  - Interactive celebratory canvas fireworks on screen transition.
  - Auspicious glass quote card with comfortable typography and illuminated border.
  - Option to edit/change name seamlessly.
- **Screen 3 — Celestial Paper Lanterns & Wishes**:
  - 8 paper lanterns in gold, orange, and rose floating across a starry night sky.
  - Tap-to-burst interaction: Spawns ~26 canvas cracker spark particles with radial velocity and gravity physics.
  - Real-time synthesized firecracker pop & harmonic chime sound effect via Web Audio API (zero audio file downloads).
  - Reveals 8 unique blessings one by one without repetition.
  - Counter tracking progress (`X of 8 blessings opened`).
  - Grand celebratory finale with confetti/firework shower, *"May all of these come true 🪔"*, and a reset/replay button.
- **Sharing & Utilities**:
  - Native Web Share API integration on mobile devices.
  - Fallback 1-click clipboard copy with animated toast notification.
  - Copy wish button on the revealed blessing card.
  - `prefers-reduced-motion` media query for accessibility.
  - 60 twinkling stars across the night sky.

---

## 📁 Project Structure

```
Diwali/
├── index.html    # Clean semantic markup with embedded SVG diya & lanterns
├── style.css     # Night-sky gradients, glassmorphism, animations, responsive shell
├── script.js     # Starfield generator, canvas particles, Web Audio API, deck management
└── README.md     # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct File (Zero Setup)
Double-click [`index.html`](index.html) or right-click and open with your preferred browser (Chrome, Edge, Safari, Firefox).

### Option 2: Local Server
In this directory, run:
```bash
python -m http.server 8000
```
Then open:
- Standard: [http://localhost:8000/](http://localhost:8000/)
- Prefilled Name: [http://localhost:8000/?name=Kaushik](http://localhost:8000/?name=Kaushik)

---

## 🌐 Free 1-Click Hosting / Sharing

To share this greeting with friends and family on WhatsApp or social media:

### Deploy to GitHub Pages (Free)
1. Initialize a git repository and push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial Diwali greeting release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/diwali-greeting.git
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and save.
4. Your greeting will be live at `https://<your-username>.github.io/diwali-greeting/`.

### Deploy to Netlify / Vercel
- Simply drag-and-drop this entire folder onto [Netlify Drop](https://app.netlify.com/drop) or import to Vercel for instant free global hosting.

---

## 🎨 Color Palette & Design Specs

| Token | Value | Preview |
| :--- | :--- | :--- |
| **Night Sky Start** | `#1a0b2e` | Deep cosmic purple |
| **Night Sky End** | `#2d1b69` | Celestial indigo |
| **Gold** | `#ffc94d` | Radiant gold |
| **Saffron** | `#ff8c1a` | Warm auspicious saffron |
| **Cream** | `#fff4d6` | Soft moonlight cream |
| **Font Serif** | Playfair Display | Headings & quotes |
| **Font Sans** | Poppins | UI labels & buttons |

---

Made with ❤️ by Kaushik

