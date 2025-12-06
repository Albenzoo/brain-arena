# 🧠 BrainArena - Frontend

WebXR Augmented Reality quiz game built with TypeScript, Three.js, and Vite. Designed for Meta Quest 3.

## 🏗️ Tech Stack

- **Language**: TypeScript 5.x
- **Build Tool**: Vite 5.x
- **3D Engine**: Three.js
- **AR**: WebXR Device API
- **Styling**: CSS3

## 📋 Prerequisites

- Node.js 18+
- npm or pnpm
- Meta Quest 3 (for AR testing)
- ADB (Android Debug Bridge) for Quest development

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure the backend API URL:

```bash
VITE_API_URL=http://localhost:3000
```

### 3. Start Development Server

For local development (HTTPS required for WebXR):

```bash
npm start
```

The app will be available at `https://localhost:4000`

**Note:** HTTPS is mandatory for WebXR features. The dev server uses a self-signed certificate.

## 📱 Testing on Meta Quest 3

### Initial Setup (One-Time)

#### 1. Enable Developer Mode on Quest 3

- Open the Meta Quest mobile app
- Go to Menu > Devices > Headset Settings
- Enable **Developer Mode**

#### 2. Install ADB on PC

**Windows:**
```bash
# Download Android Platform Tools
# https://developer.android.com/studio/releases/platform-tools

# Add to PATH or use full path
```

**macOS:**
```bash
brew install android-platform-tools
```

**Linux:**
```bash
sudo apt install adb
```

#### 3. Configure USB Debugging

1. Connect Quest 3 to PC via USB-C cable
2. Put on the headset
3. Allow USB debugging when prompted
4. Select "Always allow from this computer"

#### 4. Verify Connection

```bash
adb devices
```

Expected output:
```
List of devices attached
ce0551e7        device
```

### Daily Workflow

Every time you restart development:

#### 1. Start Backend + Frontend

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm start
```

#### 2. Connect Quest via ADB Wireless

**Option A: Via USB Cable**
```bash
# Connect cable first
adb tcpip 5555
adb connect <QUEST_IP>:5555
# Now disconnect cable
```

**Option B: Find Quest IP (no cable needed after first setup)**

In Quest 3:
- Settings > Wi-Fi > Advanced > IP Address
- Note the IP (e.g., `10.54.13.66`)

```bash
adb connect 10.54.13.66:5555
```

**Common IPs:**
```bash
# Your typical Quest IP
adb connect 10.54.13.66:5555
```

#### 3. Forward Ports to Quest

```bash
adb reverse tcp:4000 tcp:4000  # Frontend
adb reverse tcp:3000 tcp:3000  # Backend API
```

#### 4. Open in Quest Browser

1. Put on Quest 3
2. Open Browser app
3. Navigate to `https://localhost:4000`
4. Accept security certificate (first time only)
5. Click "Enter AR" button

### Quick Command Reference

```bash
# Complete setup (copy-paste ready)
npm start
adb tcpip 5555
adb connect 10.54.13.66:5555
adb reverse tcp:4000 tcp:4000
adb reverse tcp:3000 tcp:3000
```

### Troubleshooting Quest Connection

#### Device Not Found
```bash
# Check USB connection
adb devices

# Restart ADB server
adb kill-server
adb start-server
```

#### Multiple Devices Shown
```bash
# Disconnect USB cable (keep only wireless)
adb devices
# Should show only: 10.54.13.66:5555

# If still issues:
adb disconnect
adb connect 10.54.13.66:5555
```

#### Port Forwarding Failed
```bash
# Check if ports are already in use
netstat -ano | findstr :4000

# Re-forward ports
adb reverse --remove-all
adb reverse tcp:4000 tcp:4000
adb reverse tcp:3000 tcp:3000
```

#### Certificate Error in Quest
- Click "Advanced" → "Proceed to localhost (unsafe)"
- Or regenerate certificate:
  ```bash
  npm run cert:generate
  ```

### Remote Debugging

To debug in Chrome DevTools:

1. In Quest browser, open `https://localhost:4000`
2. On PC, open Chrome
3. Navigate to `chrome://inspect/#devices`
4. Find your Quest device
5. Click **"inspect"** on the browser tab

**Console logs**, **network requests**, and **errors** will appear in Chrome DevTools.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── main.ts                     # App entry point
│   ├── core/
│   │   ├── scenes/
│   │   │   └── MainScene.ts        # Main AR scene logic
│   │   └── managers/
│   │       ├── QuizUIManager.ts    # UI management
│   │       └── InteractionManager.ts # AR interactions
│   ├── services/
│   │   └── QuizService.ts          # API communication
│   ├── models/
│   │   └── Question.ts             # Data models
│   ├── components/
│   │   ├── QuestionPanel3D.ts      # 3D UI components
│   │   └── AnswerOption3D.ts
│   └── utils/
│       └── TextUtils.ts            # Helper functions
├── public/
│   └── index.html
├── .env.example
├── vite.config.ts
├── package.json
└── README.md
```

## 🎮 Game Controls

### Desktop Browser (Testing)
- **Mouse Click**: Select answer
- **Keyboard**: Navigate UI (if implemented)

### Meta Quest 3 (AR Mode)
- **Controller Ray**: Point at answers
- **Trigger Button**: Select answer
- **Look Around**: Natural head tracking
- **Hand Tracking**: Tap to select (if enabled)

## 🔧 Available Scripts

```bash
npm start           # HTTPS dev server (port 4000)
npm run dev         # HTTP dev server (port 5173, no AR)
npm run build       # Production build
npm run preview     # Preview production build
npm run lint        # ESLint check
npm run type-check  # TypeScript check
```

## 🌐 API Integration

The frontend communicates with the backend via REST API:

```typescript
// Configured in .env
VITE_API_URL=http://localhost:3000

// QuizService fetches questions
const questions = await quizService.fetchQuestions(10);
```

**Endpoints Used:**
- `GET /questions/random/:count` - Fetch random questions

## 🎨 3D Scene Architecture

```
MainScene
├── Camera (XR-enabled)
├── Lighting (Ambient + Directional)
├── QuizUIManager
│   ├── QuestionPanel3D (question text)
│   └── AnswerOption3D[] (answer buttons)
└── InteractionManager (raycasting + selection)
```

## 🚀 Production Build

### Build for Deployment

```bash
npm run build
```

Output will be in `dist/` folder.

### Environment Variables (Production)

```bash
VITE_API_URL=https://brainarena-api.onrender.com
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable on Vercel dashboard
VITE_API_URL=<your-backend-url>
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

## 🔒 HTTPS Certificate (Development)

The dev server uses a self-signed certificate for HTTPS (required by WebXR).

**First time in Quest browser:**
1. Navigate to `https://localhost:4000`
2. Click "Advanced"
3. Click "Proceed to localhost (unsafe)"

**To regenerate certificate:**
```bash
npm run cert:generate
```

## 🐛 Common Issues

### WebXR Not Working
**Symptom:** "Enter AR" button doesn't appear

**Solutions:**
- ✅ Use HTTPS (`npm start`, not `npm run dev`)
- ✅ Test on Quest 3 (WebXR not supported in desktop browsers)
- ✅ Check browser console for errors

### API Connection Failed
**Symptom:** Questions not loading

**Solutions:**
```bash
# 1. Check backend is running
curl http://localhost:3000/questions/random/5

# 2. Check CORS in backend
# ALLOWED_ORIGINS should include http://localhost:4000

# 3. Verify .env
echo $VITE_API_URL  # Should be http://localhost:3000
```

### Quest Can't Reach localhost
**Symptom:** "Connection refused" in Quest browser

**Solutions:**
```bash
# 1. Verify ADB connection
adb devices
# Should show: 10.54.13.66:5555

# 2. Re-forward ports
adb reverse tcp:4000 tcp:4000
adb reverse tcp:3000 tcp:3000

# 3. Test backend accessibility
adb shell curl http://localhost:3000/questions/random/5
```

### Three.js Rendering Issues
**Symptom:** Black screen or no 3D objects

**Solutions:**
- Check console for WebGL errors
- Verify camera position and target
- Ensure scene has lighting
- Check object positions (use `object.position.set(x,y,z)`)

## 📚 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [Meta Quest Developer](https://developer.oculus.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🎯 Gameplay Flow

1. User enters AR mode
2. Question panel appears in 3D space
3. Four answer options displayed
4. User selects answer via controller/hand tracking
5. Immediate feedback (green = correct, red = wrong)
6. **One wrong answer ends the game**
7. Score tracking for correct answers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 👤 Author

**Alberto Presenti**

---

**Backend Repository:** [../backend](../backend)