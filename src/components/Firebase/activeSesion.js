import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, getDoc } from "firebase/firestore";
export const activeSesion = async (setUser) => {
  const auth = getAuth();
  let promise = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(undefined);
      }
    });
  });
  return promise;
};

export const getPhone = () => {
  const dbConnect = getFirestore();
  let promise = new Promise((resolve, reject) => {
    activeSesion()
      .then((res) => {
        const queryFilter = doc(dbConnect, "phone", res.uid);
        getDoc(queryFilter)
          .then((resp) => {
            let phone = resp.data();
            resolve(phone);
          })
          .catch((e) => reject(e));
      })
      .catch((e) => e);
  });
  return promise;
};
