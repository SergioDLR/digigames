import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const register = async (email, password, name, phone) => {
  let promise = new Promise((resolve, reject) => {
    const db = getFirestore();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: name,
          phoneNumber: phone,
        });
        setDoc(doc(db, "wishlists", res.user.uid), {
          products: [],
        });
        setDoc(doc(db, "phone", res.user.uid), {
          phone,
        });
        resolve("Se registro al usuario con exito");
      })
      .catch((e) => reject(e));
  });
  return promise;
};
