import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  function writeCredentialUser() {
    const CredentialUser = {
      accessToken: user.accessToken,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      uid: user.uid,
    };
    localStorage.setItem("CredentialUser", JSON.stringify(CredentialUser));
  }

  function logOut() {
    localStorage.removeItem("CredentialUser");
    navigate("/");
  }

  async function signUp(email, password) {
    try {
      const credentialUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentialUser.user);
      writeCredentialUser(credentialUser);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  async function signIn(email, password) {
    try {
      const credentialUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentialUser.user);
      writeCredentialUser(credentialUser);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth() {
  return useContext(AuthContext);
}
