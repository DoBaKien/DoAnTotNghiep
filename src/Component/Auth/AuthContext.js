import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Assert/Config";
import { createContext } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [role, setRole] = useState("");
  const [test, setTest] = useState(true);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user.uid);
        const idTokenResult = await user.getIdTokenResult();
        const role = idTokenResult.claims.role;
        setRole(role);
      } else {
        localStorage.removeItem("id");
        Cookies.remove("sessionCookie");
      }
    });

    return () => unsubscribe();
  }, [test]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        test,
        setTest,
        show,
        setShow,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
