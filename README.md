# 🛒 Shopping Cart - Vue 3 + Firebase

A modern, full-featured e-commerce shopping cart application built with Vue 3, TypeScript, Firebase, and Tailwind CSS.

## ✨ Features

### 🔐 Authentication

- **User Registration** - Create new accounts with email validation
- **User Login** - Secure authentication with Firebase Auth
- **Session Management** - Persistent login state with Pinia

### 🛍️ Product Management

- **Product Catalog** - Browse all products with beautiful card layouts
- **Product Details** - View detailed information for each product
- **CRUD Operations** - Add, Edit, and Delete products (admin functionality)
- **Search** - Real-time product search by name
- **Sort** - Sort products by name or price (ascending/descending)
- **Skeleton Loading** - Smooth loading states for better UX

### 🛒 Shopping Features

- **Product Detail View** - High-quality product images with descriptions
- **Checkout Process** - Complete order form with validation
- **Order Summary** - Review cart items before purchase
- **Toast Notifications** - User-friendly feedback for all actions

### 💾 Data Persistence

- **Firebase Firestore** - Cloud-based NoSQL database
- **Real-time Updates** - Instant synchronization across devices
- **Pinia State Management** - Centralized state with persistence
- **Optimized Queries** - Efficient data fetching with Firebase queries

## 🚀 Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Pinia + Pinia Persisted State
- **Routing**: Vue Router
- **Backend**: Firebase (Authentication + Firestore)
- **Build Tool**: Vite
- **Notifications**: Vue Toastification

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

## 📁 Project Structure

```
shopping-cart/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable Vue components
│   │   ├── AddOrEditModal.vue
│   │   ├── DeleteModal.vue
│   │   ├── Header.vue
│   │   ├── ProductCard.vue
│   │   ├── Search.vue
│   │   └── Sort.vue
│   ├── firebase/        # Firebase configuration
│   │   └── firebase.ts
│   ├── pages/           # Page components
│   │   ├── Checkout.vue
│   │   ├── Login.vue
│   │   ├── ProductDetail.vue
│   │   ├── ProductList.vue
│   │   └── Register.vue
│   ├── router/          # Vue Router configuration
│   │   └── index.ts
│   ├── stores/          # Pinia stores
│   │   ├── useProductStore.ts
│   │   └── useUserStore.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── App.vue          # Root component
│   ├── main.ts          # Application entry point
│   └── style.css        # Global styles
├── public/              # Public static files
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## 🎯 Key Features Implementation

### State Management (Pinia)

- **Product Store**: Manages all product-related operations (fetch, add, update, delete)
- **User Store**: Handles authentication state and user information
- **Persistence**: State automatically saved to localStorage

### Firebase Integration

- **Firestore Queries**: Optimized queries with sorting and filtering
- **Real-time Data**: Instant updates when data changes
- **Authentication**: Secure user authentication with email/password
- **Error Handling**: Comprehensive error handling with user-friendly messages

### Routing

- **Protected Routes**: Authentication guards for secure pages
- **Dynamic Routes**: Product details and checkout with route parameters
- **Navigation Guards**: Redirect unauthorized users to login

### Form Validation

- **Email Validation**: Regex pattern for valid email format
- **Password Strength**: Minimum requirements with uppercase, lowercase, and numbers
- **Required Fields**: All forms validate required inputs
- **Real-time Feedback**: Error messages display as user types

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach, works on all devices
- **Gradient Backgrounds**: Beautiful gradient color schemes
- **Smooth Animations**: Tailwind CSS transitions and transforms
- **Loading States**: Skeleton screens while data loads
- **Toast Notifications**: Non-intrusive success/error messages
- **Modal Dialogs**: Confirmation dialogs for destructive actions

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🌐 Environment Variables

Create a `.env` file in the root directory (optional):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 📝 Firestore Data Structure

### Products Collection

```typescript
{
  id: string,           // Document ID
  name: string,         // Product name
  price: number,        // Product price
  image: string,        // Image URL
  description: string,  // Product description
  createdAt: Timestamp, // Creation date
  updatedAt?: Timestamp // Last update date
}
```

### Users Collection (managed by Firebase Auth)

```typescript
{
  uid: string,          // User ID
  email: string,        // User email
  fullname: string,     // User full name
  createdAt: Timestamp  // Registration date
}
```

## 🚧 Future Enhancements

- [ ] Shopping cart functionality with multiple items
- [ ] Pagination for large product lists
- [ ] Product categories and filtering
- [ ] User reviews and ratings
- [ ] Order history and tracking
- [ ] Admin dashboard
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Product image upload
- [ ] Wishlist functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Nguyen Duy**

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Firebase for the backend infrastructure
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters of this project

---

Made with ❤️ using Vue 3 + Firebase
