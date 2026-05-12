# 🎮 Nitendo: 3D Interactive Portfolio

A premium, immersive 3D portfolio experience inspired by the iconic Nintendo Switch. Navigate through a digital career journey using an interactive 3D Joycon gamepad, all rendered in real-time in your browser.

![Nintendo Portfolio Mockup](https://raw.githubusercontent.com/pmndrs/drei-assets/master/switch.png)
*Note: Replace with your actual project screenshot*

---

## ✨ Features

- **🕹️ Interactive 3D Gamepad**: Fully functional 3D Joycon model that reacts to your input.
- **🖼️ Dynamic Screen Content**: Navigate through About, Skills, Projects, and Contact pages directly on the 3D screen.
- **🚀 Ultra-Smooth Performance**: Built with React 19 and Three.js for high-performance 3D rendering.
- **🎭 Cinematic Animations**: Powered by GSAP and React Spring for fluid transitions and micro-interactions.
- **📱 Responsive 3D Canvas**: Adapts to different screen sizes while maintaining the immersive experience.
- **🎨 Modern Aesthetics**: Dark mode UI with vibrant Nintendo-inspired accents and glassmorphism.

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **React 3D**: [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation**: [GSAP](https://greensock.com/gsap/) & [React Spring](https://www.react-spring.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nitendo.git
   cd nitendo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
nitendo/
├── public/              # Static assets (3D models, textures)
├── src/
│   ├── components/      # Reusable 3D and UI components
│   │   ├── Experience.jsx   # Main R3F Canvas setup
│   │   ├── Gamepad.jsx      # 3D Joycon logic
│   │   └── PortfolioApp.jsx # Screen content wrapper
│   ├── pages/           # Individual portfolio sections
│   ├── styles/          # Global and component-specific CSS
│   ├── hooks/           # Custom React hooks
│   └── App.jsx          # Entry component
└── vite.config.js       # Vite configuration
```

---

## 🎮 How to Navigate

- **Click & Drag Background**: Rotate the 3D scene to view the console from different angles.
- **Joycon Buttons**:
  - **(Y)**: About Page
  - **(X)**: Skills Page
  - **(A)**: Projects Page
  - **(B)**: Contact Page
  - **(+)**: Toggle Menu
- **Analog Stick Interaction**: Click and drag the Joycons up or down to scroll through long page content.
- **Interactive UI**: Elements on the screen are also clickable for traditional navigation.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/nitendo/issues).

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ and ☕ by <a href="https://github.com/your-username">Your Name</a>
</p>
