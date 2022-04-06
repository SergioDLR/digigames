import { signOut, getAuth } from "firebase/auth";
export const closeSesion = (setUser) => {
  const auth = getAuth();
  signOut(auth).then(setUser(undefined));
};
