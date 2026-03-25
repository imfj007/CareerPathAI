# CareerPath AI

AI-powered career guidance tool that analyzes your skills, interests, and goals to provide personalized career recommendations.

**Live Demo:** [careerpath-ai](https://yourusername.github.io/careerpath-ai/)

## Features

- 🎯 **3-Step Career Profiling** — Skills, interests, and goals assessment
- 🤖 **AI-Powered Recommendations** — Uses Claude AI for personalized career matches  
- 📄 **PDF Report Download** — Generate a branded career report
- 🎨 **Glass Morphism UI** — Premium, modern design
- 📱 **Fully Responsive** — Works on all devices
- 🖼️ **iframe Ready** — Seamless WordPress embedding with auto-resize

## Tech Stack

- React + Vite
- Tailwind CSS (glass morphism theme)
- React Router DOM (HashRouter for GH Pages)
- Anthropic Claude API (`claude-sonnet-4-20250514`)
- jsPDF for PDF generation
- GitHub Pages deployment via `gh-pages`

## Setup

### 1. Clone & install

```bash
git clone https://github.com/yourusername/careerpath-ai.git
cd careerpath-ai
npm install
```

### 2. Configure API key

Create a `.env` file in the project root:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 3. Run locally

```bash
npm run dev
```

Open `http://localhost:5173/careerpath-ai/`

### 4. Deploy to GitHub Pages

```bash
npm run deploy
```

## Embedding in WordPress

Add this iframe to your WordPress page:

```html
<iframe 
  src="https://yourusername.github.io/careerpath-ai/" 
  width="100%" 
  style="border:none; overflow:hidden;" 
  id="careerpath-iframe"
></iframe>

<script>
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'careerpath-resize') {
    document.getElementById('careerpath-iframe').style.height = e.data.height + 'px';
  }
});
</script>
```

## License

MIT
