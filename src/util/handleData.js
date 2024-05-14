import { db } from './firebase';
import { collection, doc, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import api from './movieApi';
import requests from './requests';


const moviesCollectionRef = collection(db, 'favorite_movies');
const fetchData = async (fetchUrl) => {
  const request = await api.get(fetchUrl);
  return request.data;
};

export const existFav = async (movie, uid, favRemRef, favAddRef) => {
  if (movie) {
    try {
      // Firestoreにおけるクエリ検索の仕方
      const q = query(collection(db, "favorite_movies"), where("movie_id", "==", movie.id), where('user_id', '==', uid));
      const querySnapshot = await getDocs(q);
      // querySnapshot.exist()やquerySnapshot.docs.exist()は使えない
      if (querySnapshot.docs.length) {
        // 既にお気に入りに登録されている場合
        favRemRef.current.style.display = "inline-block";
        favAddRef.current.style.display = "none";
      } else {
        favRemRef.current.style.display = "none";
        favAddRef.current.style.display = "inline-block";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const addFav = async (movieId, uid, favRemRef, favAddRef) => {
  try {
    // addDocは自動生成されたDocIdを返し、setDocは任意のDocIdを指定できる
    const documentRef = await addDoc(moviesCollectionRef, {
      movie_id: movieId,
      user_id: uid,
    });
    alert("お気に入りに追加しました")
    favRemRef.current.style.display = "inline-block";
    favAddRef.current.style.display = "none";
  } catch (e) {
    alert("お気に入り追加に失敗しました")
  }
}

export const remFav = async (movieId, uid, favRemRef, favAddRef) => {
  try {
    const q = query(moviesCollectionRef, where('movie_id', '==', movieId), where('user_id', '==', uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const favDocRef = doc(db, 'favorite_movies', document.id);
      await deleteDoc(favDocRef);
    });
    alert("お気に入りから削除しました")
    favRemRef.current.style.display = "none";
    favAddRef.current.style.display = "inline-block";
  } catch (e) {
    alert("お気に入り削除に失敗しました")
  }
}

export const fetchFav = async (currentUser, setMovies) => {
  try {
    const favoriteIds = [];
    const q = query(collection(db, "favorite_movies"), where("user_id", "==", currentUser.uid));

    getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        // React hooksのset関数を使う場合、set関数はmapなどによる連続的な呼び出しに耐えられないためfavoriteIds(Array)を使用
        favoriteIds.push(doc.data().movie_id);
      });
      // お気に入り映画のIDを取り出し、全てAPIのエンドポイントに変えて配列に格納(Setで重複も消す)
      const fetchUrls = Array.from(new Set(favoriteIds.map((favoriteId) => requests.fetchById.replace('movieId', favoriteId))));
      const fetchFunc = fetchUrls.map((fetchUrl) => fetchData(fetchUrl));
      // set関数は連続的な呼び出しに弱いため、fetchDataの中で呼び出すのではなく、Promise.allで一括実行したのち、その結果を一度のset呼び出しで格納する
      Promise.all(fetchFunc).then((res) => {
        setMovies(res);
      });
    });
  } catch (e) {
    console.log("エラー発生")
  }
}
