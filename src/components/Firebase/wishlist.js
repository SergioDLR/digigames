import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import { activeSesion } from "components/Firebase/activeSesion";

export const getWishList = () => {
  const dbConnect = getFirestore();
  let promise = new Promise((resolve, reject) => {
    activeSesion().then((user) => {
      if (user) {
        const queryFilter = doc(dbConnect, "wishlists", user.uid);
        getDoc(queryFilter)
          .then((resp) => {
            let wish = resp.data();
            resolve({ wish, user });
          })
          .catch((e) => reject(e));
      }
    });
  });
  return promise;
};

export const isInWishList = (item) => {
  let promise = new Promise((resolve, reject) => {
    getWishList()
      .then((wishListRes) => {
        let isIn = false;
        wishListRes.wish.products.forEach((element) => {
          if (element.id === item.id) isIn = true;
        });
        resolve({ isIn, wishListRes });
      })
      .catch((e) => reject(e));
  });
  return promise;
};

export const addToWishList = (item) => {
  const dbConnect = getFirestore();
  let promise = new Promise((resolve, reject) => {
    isInWishList(item)
      .then((resp) => {
        let { wish, user } = resp.wishListRes;
        if (!resp.isIn) {
          wish.products.push(item);
          const queryUpdate = doc(dbConnect, "wishlists", user.uid);
          updateDoc(queryUpdate, { products: wish.products }).then(resolve(true)).catch(reject(false));
        }
      })
      .catch();
  });
  return promise;
};

export const deleteFromWishList = (item) => {
  const dbConnect = getFirestore();
  let promise = new Promise((resolve, reject) => {
    isInWishList(item)
      .then((resp) => {
        let { wish, user } = resp.wishListRes;
        if (resp.isIn) {
          wish.products = wish.products.filter((element) => element.id !== item.id);

          const queryUpdate = doc(dbConnect, "wishlists", user.uid);
          updateDoc(queryUpdate, { products: wish.products }).then(resolve(true)).catch(reject(false));
        }
      })
      .catch();
  });
  return promise;
};
