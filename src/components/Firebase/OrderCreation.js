import { collection, query, where, documentId, writeBatch, getDocs, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { stockCheck } from "./stockCheck";
export const createOrder = (orderName, orderPhone, orderMail, finalPrice, cartList) => {
  let order = {};
  const date = new Date();
  order.buyer = { orderName, orderPhone, orderMail };
  order.items = cartList.map((element) => {
    const { id, title, price } = element.item;
    const quantity = element.quantity;
    return { id, title, price, quantity };
  });
  order.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  order.total = finalPrice;
  order.state = "generada";

  return order;
};

export const updateStocks = async (dbConnect, cartList) => {
  const queryCollection = collection(dbConnect, "products");
  const queryStockUpdate = await query(
    queryCollection,
    where(
      documentId(),
      "in",
      cartList.map((e) => e.item.id)
    )
  );
  const batch = writeBatch(dbConnect);
  await getDocs(queryStockUpdate).then((resp) =>
    resp.docs.forEach((e) =>
      batch.update(e.ref, {
        stock: e.data().stock - cartList.find((element) => element.item.id === e.id).quantity,
      })
    )
  );
  batch.commit();
};

export const submitOrder = (orderName, orderPhone, orderMail, finalPrice, cartList) => {
  const promise = new Promise((resolve, reject) => {
    const dbConnect = getFirestore();
    const queryCollection = collection(dbConnect, "orders");
    const order = createOrder(orderName, orderPhone, orderMail, finalPrice, cartList);
    stockCheck(cartList)
      .then((res) => {
        addDoc(queryCollection, order)
          .then(({ id }) => {
            if (id) {
              updateStocks(dbConnect, cartList);
              resolve(id);
            }
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((e) => {
        reject(e);
      });
  });
  return promise;
};
