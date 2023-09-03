import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  addUserToDatabase,
  getUsersFromDatabase,
  updateUserToDatabase,
} from "../services/axiosServices";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // User bilgilerinin belirli field'larını alır.
  function selectedUserFields(user) {
    return {
      accessToken: user.accessToken,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      creationTime: user.creationTime,
      lastSignInTime: user.lastSignInTime,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      uid: user.uid,
      profiles: [],
    };
  }

  // Filtrelenmiş User bilgilerini localStorage'a ekler.
  function addUserToLocalStorage(selectedUser) {
    localStorage.setItem("CredentialUser", JSON.stringify(selectedUser));
  }

  // Kullanıcı çıkışında localStorage üzerinden bilgilerini kaldırır.
  function removeUserToLocalStorage() {
    localStorage.removeItem("CredentialUser");
    navigate("/");
  }

  // Kullanıcı kimlik doğrulama işlemleri
  async function authenticateFirebaseUser(email, password, action) {
    try {
      const credentialUser =
        action === "signUp"
          ? await createUserWithEmailAndPassword(auth, email, password) // Signup durumunda firebase kayıt işlemi
          : await signInWithEmailAndPassword(auth, email, password); // SignIn durumunda firebase giriş işlemi

      const user = selectedUserFields(credentialUser.user);
      setUser(user); // Firabese'den gelen user bilgisi
      addUserToLocalStorage(user);
      action === "signUp" && (await addUserToDatabase(user)); // Gelen user bilgisi üzerinden belirli fieldları db.json'a ekler.
      navigate("/home");
    } catch (error) {
      console.log("authenticateFirebaseUser Hata:", error);
    }
  }

  // Kullanıcı firebase kayıt olma işlemi
  async function signUp(email, password) {
    await authenticateFirebaseUser(email, password, "signUp");
  }

  // Kullanıcı firebase giriş işlemi
  async function signIn(email, password) {
    await authenticateFirebaseUser(email, password, "signIn");
  }

  // Giriş yapmış kullanıcının Users tablosundaki verilerini getirir.
  async function getCurrentUser() {
    const userUID = JSON.parse(localStorage.getItem("CredentialUser")).uid; // Kullanıcının uid bilgisini getirir.
    const usersFromDB = await getUsersFromDatabase(); // Users verilerini aktarır.
    const matchingUser = usersFromDB.find((user) => user.uid === userUID);
    return matchingUser;
  }

  // Kullanıcının hesabında yeni bir izleyici profili oluşturur.
  async function addNewUserProfile(newUserProfile) {
    const currentUser = await getCurrentUser();
    const updatedUser = { ...currentUser }; // Anlık kullanıcı bilgileri aktarılır.

    // Kullanıcı profil sayısı 3 ten büyükse oluşturamaz.
    if (updatedUser.profiles.length <= 2) {
      updatedUser.profiles.push(newUserProfile);
      updateUserToDatabase(currentUser.id, updatedUser);
    } else {
      return "4 kişiden daha fazla profil olamaz.";
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        removeUserToLocalStorage,
        addNewUserProfile,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth() {
  return useContext(AuthContext);
}
