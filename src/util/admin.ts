// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_Kc_yGZR9fwPAH0HTyG4yjcbgSo3Oq94",
  authDomain: "polar-casing-323423.firebaseapp.com",
  projectId: "polar-casing-323423",
  storageBucket: "polar-casing-323423.appspot.com",
  messagingSenderId: "903189875911",
  appId: "1:903189875911:web:c53d13f14eb50d3127c2e2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/
if (location.hostname === "localhost") {
  let EMULATOR_PORT = 8090;
  try {
    connectFirestoreEmulator(db, "localhost", EMULATOR_PORT);
  } finally {
    console.log(
      `%c WE ARE RUNNING ON AN EMULATOR AT  localhost:${EMULATOR_PORT}`,
      "color: yellow"
    );
  }
}
