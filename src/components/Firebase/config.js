import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAGchbF-1CjrRrXY1EXHlZcXNU_jRm6zXI",
  authDomain: "digigames-5510e.firebaseapp.com",
  projectId: "digigames-5510e",
  storageBucket: "digigames-5510e.appspot.com",
  messagingSenderId: "68370162700",
  appId: "1:68370162700:web:8f37535952941fb08e3a29",
};

const app = initializeApp(firebaseConfig);

export const getFirestoneApp = () => app;
