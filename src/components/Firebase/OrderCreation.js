import { collection, query, where, documentId, writeBatch, getDocs } from "firebase/firestore";

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
