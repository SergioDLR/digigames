import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const login = (email, password) => {
  let promise = new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") reject("No se encontro el usuario");
        else reject("Ocurrio un error, intentalo mas tarde");
      });
  });
  return promise;
};
