import { getAuth, onAuthStateChanged } from "firebase/auth";
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
