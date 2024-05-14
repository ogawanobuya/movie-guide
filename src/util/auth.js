import { auth } from './firebase';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const logOut = (currentUser) => {
  const result = window.confirm('あなたは今「'+currentUser.email+'」のメアドでログインしています。ログアウトしますか？');
  if( result ) {
    signOut(auth).then(() => {
      window.location.href = "/sign-in";
    }).catch((error) => {
      console.log("ログアウト失敗");
    });
  }
  else {
    return null;
  }
}

export const handleSingUp = (email, password) => {
  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // 登録したユーザーを返す
      const user = userCredential.user;
      alert("ユーザー登録完了しました");
      window.location.href = "/";
    })
    .catch((error) => {
      alert("ユーザー登録に失敗しました\n"+error.message);
    });
  }
}

export const handleSingIn = (email, password) => {
  if (email && password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // ログインしたユーザーを返す
      const user = userCredential.user;
      window.location.href = "/";
    })
    .catch((error) => {
      alert("ログインに失敗しました\n"+error.message);
    });
  }
}
