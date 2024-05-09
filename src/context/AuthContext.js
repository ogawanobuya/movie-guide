import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../util/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    // コンポーネントのアンマウント時にunsubscribeでonAuthStateChangedに登録していた関数を解除しないと多重登録になる
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>;
}
