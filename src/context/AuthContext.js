import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../util/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '../component/Loading';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('');
  const [signInCheck, setSignInCheck] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setSignInCheck(true);
      } else {
        setSignInCheck(true);
      }
    });
    // コンポーネントのアンマウント時にunsubscribeでonAuthStateChangedに登録していた関数を解除しないと多重登録になる
    return () => {
      unsubscribe();
    };
  }, []);

  // これがないとリロードした時に非同期のonAuthStateChangedにより一瞬ログインユーザー不在となり、サインインページに引き戻される
  if (signInCheck) {
    return <AuthContext.Provider value={{currentUser, signInCheck}}>{children}</AuthContext.Provider>;
  } else {
    // ログイン情報読み込み中
    return <Loading />;
  }
}
