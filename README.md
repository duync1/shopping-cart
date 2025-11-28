# 🛒 Shopping Cart - Vue 3 + Firebase

A modern, full-featured e-commerce shopping cart application built with Vue 3, TypeScript, Firebase, and Tailwind CSS.

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Setup Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd shopping-cart
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config credentials
   - Create `src/firebase/firebase.ts` with your config:

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

4. **Run development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```
---

Made with ❤️ using Vue 3 + Firebase
