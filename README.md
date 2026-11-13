# ✨ Extreme Pixel UI — Official Web Presentation for Android Customization Suite

A responsive, high-performance web presentation and interactive showcase built for **Extreme Pixel UI**, bringing the authentic **Google Pixel & Material Design 3 (Material You)** experience to any Android device.

---

## 🌟 Key Highlights & Features

1. **Material Design 3 & Pixel Visual Identity**:
   - Tonal color palettes based on Google's Material Color Utilities algorithm.
   - Material 3 pill shapes, extra-large rounded containers (`28px`), and accessible tonal contrast.
   - 5 curated Material You Monet palettes: *Pixel Bay Blue, Hazel Sage, Coral Rose, Porcelain Amber, and Obsidian Slate*.

2. **Interactive Google Pixel 9 Pro Simulator ("Pixel Studio")**:
   - High-fidelity Google Pixel chassis with centered camera punch-hole and aluminum curved rails.
   - **Live Clock & Pixel Date Engine**: Accurately tracks system time and updates live with the iconic 2-line digital clock.
   - **Dynamic Monet Tonal Palette Switcher**.
   - **Swappable Pixel Widgets**:
     - *Pixel At a Glance (Contextual Weather, AQI & Calendar Sync)*
     - *Material Music Player / Now Playing* (with interactive Play/Pause controls)
     - *Google Tensor Hardware Telemetry* (Tensor G4, RAM, Battery health, 120Hz LTPO display)
     - *Google Fit Daily Checklist*
   - **Themed Icons 2.0 Engine**: Dynamic monochrome tinting matching wallpaper tones (Squircle M3, Circle Pixel, Minimal Glyph, Tonal Elevated).
   - **Pixel Live Notification Island**: Toggle between Idle Punch, Live Audio Waves, Rapid Charging, and Google Maps Navigation.
   - **Pixel Nature & Abstract Wallpapers**: 4 curated gradients.
   - **Bottom Search Bar**: Complete with multicolored Google "G" logo, microphone, and Google Lens icons.

3. **Feature Bento Grid**:
   - Material You Monet 3.0 wallpaper extraction engine
   - < 0.8% 24h battery drain with Android Doze & JobScheduler sleep optimization
   - Pixel At a Glance live space
   - Shizuku wireless rootless system theming (Knox-safe & banking app compatible)
   - Themed Icons 2.0 universal tinting

4. **Curated Presets Hub**:
   - Filterable categories: All, Bay Blue, Hazel Sage, Coral Rose, Porcelain Amber.
   - One-click **"Apply Live"** button that injects the preset settings directly into the live Pixel simulator!

5. **Universal Hardware Compatibility Matrix**:
   - Google Pixel (Android 12 - 16+), Samsung One UI 5 / 6 / 7, Xiaomi HyperOS, OnePlus OxygenOS, Nothing OS, Motorola MyUX.

6. **Download Modal & Safety**:
   - Google Play Store badge, Direct APK download (`ExtremePixelUI-v3.5.2-release.apk`), and GitHub Release.
   - SHA-256 Checksum with one-click copy.

---

## 🚀 Quick Start & How to Run

### Option 1: Python Built-in Server (Recommended)
You can run the included Python server:
```bash
cd /home/g-p/.gemini/antigravity/scratch/android-customizer-web
python3 server.py
```
Then open your browser at `http://localhost:8080`.

### Option 2: Direct Browser Opening
Simply double-click or open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge). No node or build tools are required — it is 100% self-contained and zero-dependency!

---

## 📁 Project Structure

```
android-customizer-web/
├── index.html        # Material Design 3 / Pixel landing page markup
├── styles.css        # Material 3 tonal palettes, pill geometries & Pixel chassis
├── script.js         # Interactive Pixel simulator, live clock, At a Glance, and Monet switcher
├── server.py         # Lightweight Python 3 HTTP server with auto-port allocation
└── README.md         # Documentation & setup guide
```
