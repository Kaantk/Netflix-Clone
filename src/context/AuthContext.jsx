import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
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

  function getByErrorMessage(error) {
    switch (
      error.code // Hata kodunu doğru şekilde kontrol ediyoruz.
    ) {
      case "auth/email-already-in-use":
        return "E-mail address is already in use.";

      case "auth/weak-password":
        return "Password is too weak. Please choose a stronger one.";

      case "auth/user-not-found":
        return "User not found. Please check your credentials.";

      case "auth/invalid-email":
        return "Invalid email address. Please enter a valid email.";

      case "auth/wrong-password":
        return "Incorrect password. Please try again.";

      default:
        return "An unknown error occurred.";
    }
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
          ? await createUserWithEmailAndPassword(auth, email, password)
          : await signInWithEmailAndPassword(auth, email, password);

      const user = selectedUserFields(credentialUser.user);
      setUser(user);
      addUserToLocalStorage(user);
      action === "signUp" && (await addUserToDatabase(user));
      navigate("/home");
    } catch (error) {
      return alert(getByErrorMessage(error)); // Hatanın fırlatılması
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
      return alert("Kullanıcı profil sayısı toplamda 4'ten fazla olamaz.");
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
