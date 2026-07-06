// Firebase Integration Service
// Initializes Firebase & Firestore, and provides simple methods to record inquiries.
// If configurations are missing in environment variables, logs data to localStorage and console
// so the demo application works completely standalone.

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Firebase credentials fetched from Vite env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

const hasFirebaseConfig = firebaseConfig.apiKey && firebaseConfig.projectId;

let app;
let auth;
let db;

if (hasFirebaseConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase initialized successfully with credentials.");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase credentials missing. Running in mock simulation mode.");
}

// In-Memory/LocalStorage Simulation Layer for standalone demo
const getMockDatabase = (key) => {
  try {
    const data = localStorage.getItem(`camp_revive_${key}`);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveToMockDatabase = (key, data) => {
  try {
    const list = getMockDatabase(key);
    const itemWithId = {
      id: `mock_${Date.now()}_${Math.floor(Math.random()*1000)}`,
      timestamp: new Date().toISOString(),
      ...data
    };
    list.unshift(itemWithId);
    localStorage.setItem(`camp_revive_${key}`, JSON.stringify(list));
    return itemWithId;
  } catch (e) {
    console.error(`Mock database write failed for ${key}:`, e);
    return data;
  }
};

export const firebaseService = {
  // Save custom contact/general inquiry
  async saveInquiry(inquiryData) {
    // inquiryData: { name, email, phone, inquiryType, message }
    console.log("Saving Inquiry Submitting:", inquiryData);

    if (hasFirebaseConfig && db) {
      try {
        const docRef = await addDoc(collection(db, "inquiries"), {
          ...inquiryData,
          createdAt: serverTimestamp(),
          status: "pending"
        });
        return { success: true, id: docRef.id };
      } catch (error) {
        console.error("Firebase error saving inquiry. Saving to local simulation instead:", error);
      }
    }

    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 800)); // simulate network delay
    const saved = saveToMockDatabase("inquiries", inquiryData);
    return { success: true, id: saved.id, isMock: true };
  },

  // Save specific camp experience/sports booking inquiry
  async saveBooking(bookingData) {
    // bookingData: { name, email, phone, experienceTitle, category, startDate, guestsCount, message }
    console.log("Saving Booking Submitting:", bookingData);

    if (hasFirebaseConfig && db) {
      try {
        const docRef = await addDoc(collection(db, "bookings"), {
          ...bookingData,
          createdAt: serverTimestamp(),
          status: "pending"
        });
        return { success: true, id: docRef.id };
      } catch (error) {
        console.error("Firebase error saving booking. Saving to local simulation instead:", error);
      }
    }

    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 800)); // simulate network delay
    const saved = saveToMockDatabase("bookings", bookingData);
    return { success: true, id: saved.id, isMock: true };
  },

  // Simple auth wrapper
  auth: {
    async login(email, password) {
      if (hasFirebaseConfig && auth) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          return { success: true, user: userCredential.user };
        } catch (error) {
          console.error("Firebase login error:", error);
          throw error;
        }
      }

      // Mock administrator login
      await new Promise(resolve => setTimeout(resolve, 800));
      if (email === "admin@camprevive.in" && password === "admin123") {
        const mockUser = { email: "admin@camprevive.in", uid: "mock_admin_uid" };
        localStorage.setItem("camp_revive_admin_user", JSON.stringify(mockUser));
        return { success: true, user: mockUser };
      } else {
        throw new Error("Invalid admin credentials. Use admin@camprevive.in / admin123");
      }
    },

    async logout() {
      if (hasFirebaseConfig && auth) {
        await signOut(auth);
        return { success: true };
      }
      localStorage.removeItem("camp_revive_admin_user");
      return { success: true };
    },

    onAuthChanged(callback) {
      if (hasFirebaseConfig && auth) {
        return onAuthStateChanged(auth, callback);
      }

      // Mock auth listener
      const checkLocalAuth = () => {
        const localUser = localStorage.getItem("camp_revive_admin_user");
        callback(localUser ? JSON.parse(localUser) : null);
      };
      
      checkLocalAuth();
      // Listen to storage events to keep tabs synced
      window.addEventListener("storage", checkLocalAuth);
      return () => window.removeEventListener("storage", checkLocalAuth);
    }
  },

  // Helper to fetch saved inquiries in admin mode
  async getInquiries() {
    return getMockDatabase("inquiries");
  },

  // Helper to fetch saved bookings in admin mode
  async getBookings() {
    return getMockDatabase("bookings");
  }
};
