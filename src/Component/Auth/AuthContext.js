import React, { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import auth from "../../Assert/Config";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
        user.getIdTokenResult().then(function (idTokenResult) {
          var uid = idTokenResult.claims.uid;
          var role = idTokenResult.claims.role;
          setRole(role);
        });
      } else {
        localStorage.removeItem("id");
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
