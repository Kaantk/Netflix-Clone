import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkhfgIDMVMnz-tcXcOf-j9soj24tKB3xQ",
  authDomain: "netflix-clone-2ca5a.firebaseapp.com",
  projectId: "netflix-clone-2ca5a",
  storageBucket: "netflix-clone-2ca5a.appspot.com",
  messagingSenderId: "1056236756269",
  appId: "1:1056236756269:web:f18c2308a55557ff3e07a4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
