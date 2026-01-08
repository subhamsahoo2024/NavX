# Indoor Navigation System

An Indoor Navigation System for a college campus using Multi-Map Navigation with Gateway Nodes, powered by Firebase Firestore and Google Gemini AI.

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Firestore
- **AI**: Google Gemini 2.5 Flash (Intent Detection)
- **Graphics**: HTML5 Canvas & SVG
- **State Management**: React Hooks

## Features

- 🗺️ **Multi-Map Navigation** across Campus, Building, and Floor levels
- 🚪 **Gateway Nodes** for seamless transitions between maps
- 🤖 **AI-Powered Chatbot** using Google Gemini for natural language navigation
- 📍 **Real-time Pathfinding** with Dijkstra algorithm
- 🎨 **Interactive Canvas** with touch/mouse support
- 📱 **Mobile Responsive** with native-like animations
- 🔥 **Firebase Backend** for real-time data storage
- ⚡ **Fast Performance** with Next.js 16 and Turbopack

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Firebase Project with Firestore enabled
- Google Gemini API Key

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd indoor-nav
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
# Firebase Client SDK (Browser-side) - Public variables
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your-project.firebasedatabase.app
FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Server-side)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----\n"

# OR use service account file (recommended)
FIREBASE_SERVICE_ACCOUNT_KEY_PATH=./service-account.json

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# App Settings
NEXT_PUBLIC_USE_DATABASE=true
```

4. **Get Firebase credentials**

   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project or select existing
   - Enable Firestore Database
   - Go to Project Settings → Service Accounts
   - Generate new private key (downloads `service-account.json`)
   - Place the file in the project root

5. **Get Gemini API Key**

   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add to `.env.local` as `GEMINI_API_KEY`

6. **Seed the database (optional)**

```bash
# Run development server first
npm run dev

# Then visit (or use curl)
http://localhost:3000/api/seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Environment Variables Reference

| Variable                            | Required | Description                  | Example                                     |
| ----------------------------------- | -------- | ---------------------------- | ------------------------------------------- |
| `FIREBASE_API_KEY`                  | Yes      | Firebase Web API Key         | `AIzaSyD...`                                |
| `FIREBASE_AUTH_DOMAIN`              | Yes      | Firebase Auth Domain         | `your-project.firebaseapp.com`              |
| `FIREBASE_DATABASE_URL`             | No       | Realtime Database URL        | `https://your-project.firebasedatabase.app` |
| `FIREBASE_STORAGE_BUCKET`           | Yes      | Cloud Storage Bucket         | `your-project.firebasestorage.app`          |
| `FIREBASE_MESSAGING_SENDER_ID`      | Yes      | Cloud Messaging Sender ID    | `123456789`                                 |
| `FIREBASE_APP_ID`                   | Yes      | Firebase App ID              | `1:123:web:abc`                             |
| `FIREBASE_PROJECT_ID`               | Yes      | Firebase Project ID          | `your-project-id`                           |
| `FIREBASE_CLIENT_EMAIL`             | Yes\*    | Service Account Email        | `firebase-adminsdk@...`                     |
| `FIREBASE_PRIVATE_KEY`              | Yes\*    | Service Account Private Key  | `-----BEGIN PRIVATE KEY-----...`            |
| `FIREBASE_SERVICE_ACCOUNT_KEY_PATH` | Yes\*    | Path to service account JSON | `./service-account.json`                    |
| `GEMINI_API_KEY`                    | Yes      | Google Gemini API Key        | `AIzaSy...`                                 |
| `NEXT_PUBLIC_USE_DATABASE`          | Yes      | Enable database features     | `true`                                      |

**Note:** Either use `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` OR `FIREBASE_SERVICE_ACCOUNT_KEY_PATH` (recommended)

## Project Structure

```
indoor-nav/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── navigate/          # Navigation page
│   │   ├── admin/             # Admin panel
│   │   └── api/               # API routes
│   │       ├── maps/          # Map CRUD operations
│   │       ├── chat/          # AI chatbot endpoint
│   │       ├── upload/        # Image upload
│   │       └── seed/          # Database seeding
│   ├── components/            # React components
│   │   ├── IndoorNavigation.tsx
│   │   ├── LocationSelector.tsx
│   │   ├── AIChatbot.tsx
│   │   └── admin/
│   │       └── MapEditor.tsx
│   ├── lib/                   # Utilities & services
│   │   ├── firebase.ts        # Firebase Admin SDK
│   │   ├── firebaseClient.ts  # Firebase Client SDK
│   │   ├── mapService.ts      # Map data access
│   │   └── pathfinder.ts      # Navigation algorithms
│   ├── hooks/                 # Custom React hooks
│   │   ├── useImageDimensions.ts
│   │   └── useMapDimensions.ts
│   ├── types/                 # TypeScript definitions
│   │   └── navigation.ts      # Core types
│   └── data/                  # Mock data
│       └── mockGraph.ts
├── public/
│   └── maps/                  # Map images
├── scripts/
│   └── migrate-mongo-to-firebase.js
├── .env.local                 # Environment variables
├── service-account.json       # Firebase service account (gitignored)
└── package.json
```

## API Endpoints

### Maps Management

- `GET /api/maps` - List all maps (metadata)
- `POST /api/maps` - Create a new map
- `GET /api/maps/[id]` - Get map by ID
- `PUT /api/maps/[id]` - Update map
- `DELETE /api/maps/[id]` - Delete map

### Navigation

- `POST /api/chat` - AI chatbot intent detection (Gemini)

### Utilities

- `GET /api/seed` - Seed database with mock data
- `POST /api/upload` - Upload map images

## Architecture

### Multi-Map Navigation

The system uses a hierarchical map structure:

- **Campus Map**: Overview of the entire campus with building locations
- **Building Maps**: Individual building layouts with floor connections
- **Floor Maps**: Detailed floor plans with rooms, corridors, and facilities

### Gateway Nodes

Gateway Nodes are special connection points that link different maps together, enabling seamless navigation from one map level to another (e.g., from campus entrance to a specific room on the 3rd floor of a building).

**Gateway Configuration:**

```typescript
{
  id: "gateway_node_id",
  type: "GATEWAY",
  name: "Building A Entrance",
  gatewayConfig: {
    targetMapId: "building_a_lobby",  // Destination map
    targetNodeId: "lobby_entry"       // Entry point on destination map
  }
}
```

### Pathfinding Algorithm

The system uses **Dijkstra's Algorithm** for finding the shortest path:

1. **Single Map**: Direct pathfinding within one map
2. **Cross-Map**: Automatically traverses gateway nodes to navigate between maps
3. **Global Graph**: Builds connections between all maps via gateways

### AI Chatbot (Gemini Integration)

The chatbot uses Google Gemini 1.5 Flash for natural language intent detection:

**Supported Categories:**

- Facilities: canteen, library, medical, drinking water, parking
- Restrooms: gender-specific and general
- Administration: offices, HODs, principal, chairman
- Academic: computer labs, departments
- Recreation: gym, sports ground, auditoriums

**Example:**

```
User: "I'm hungry"
AI: Detects "canteen" intent
System: Shows navigation to nearest canteen
```

## Database Schema (Firestore)

### Maps Collection

```typescript
{
  id: string,                    // Custom map identifier
  name: string,                  // Display name
  imageUrl: string,              // Map image path
  nodes: Node[],                 // Array of navigation nodes
  adjacencyList: {               // Graph connections
    [nodeId: string]: Edge[]
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Node Structure

```typescript
{
  id: string,
  x: number,                     // Percentage (0-100)
  y: number,                     // Percentage (0-100)
  type: "NORMAL" | "ROOM" | "GATEWAY",
  name: string,
  description?: string,
  category?: string,             // For chatbot matching
  gatewayConfig?: {
    targetMapId: string,
    targetNodeId: string
  }
}
```

## Usage

### For Users (Navigation)

1. Go to `/navigate`
2. Select start location (or scan QR code)
3. Choose destination from list or use chatbot
4. Follow the animated path on the map
5. Gateway nodes show transitions between maps

### For Admins (Map Management)

1. Go to `/admin`
2. Create new maps or edit existing ones
3. Add nodes by clicking on the map
4. Connect nodes by selecting "Connect" mode
5. Configure gateway nodes for cross-map navigation
6. Save changes to Firestore

### Chatbot Commands

Natural language examples:

- "I need food" → Navigates to canteen
- "Where's the library?" → Shows library location
- "Boys toilet" → Finds men's restroom
- "I want to meet the CSE HOD" → CSE HOD office
- "Need water" → Drinking water locations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For questions or support, contact the development team.

---
