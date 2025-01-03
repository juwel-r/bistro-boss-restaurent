import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext("");
const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");
  const [loading, setLoading] = useState(true);

  //Register User
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Login User
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Update user Profile
  const updateUserProfile = (data) => {
    return updateProfile(auth.currentUser, data);
  };

  // Log Out User
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // User Auth Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  // console.log("user", userInfo);
  const authData = {
    userInfo,
    setUserInfo,
    loading,
    register,
    login,
    loginWithGoogle,
    updateUserProfile,
    logOut,
  };
  return (
    <div>
      <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
