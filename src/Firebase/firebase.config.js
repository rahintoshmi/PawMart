import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDRg4_5EW4VcRrdp1XpYGG_DT88lGbuPTk",
  authDomain: "pawmart-pet-supply.firebaseapp.com",
  projectId: "pawmart-pet-supply",
  storageBucket: "pawmart-pet-supply.firebasestorage.app",
  messagingSenderId: "88941929156",
  appId: "1:88941929156:web:d1f5ea6905d231a842df91"
};
const app = initializeApp(firebaseConfig);
export default app;