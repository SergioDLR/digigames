import { collection, documentId, getDocs, getFirestore, query, where } from "firebase/firestore";
export const stockCheck = (products) => {
  const dbConnect = getFirestore();
  const productsId = products.map((product) => product.item.id);
  const queryCollection = collection(dbConnect, "products");
  const promise = new Promise((resolve, reject) => {
    const queryFilter = query(queryCollection, where(documentId(), "in", productsId));
    getDocs(queryFilter).then((response) => {
      response.docs.forEach((element) => {
        const resDocument = element.data();
        products.forEach((productElement) => {
          if (productElement.quantity > resDocument.stock && element.id === productElement.item.id)
            reject({ code: 401, msg: "No queda stock suficiente para la compra" });
        });
      });
      resolve({ code: 200, msg: "Compra realizada correctamente" });
    });
  });

  return promise;
};
