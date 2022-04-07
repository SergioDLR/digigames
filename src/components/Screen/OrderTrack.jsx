import React, { useState } from "react";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import CartDetail from "components/Cart/CartDetail";
import Button from "components/Utilities/Button";
import { priceParser } from "components/Utilities/priceParser";
import { useAlert } from "react-alert";
const OrderTrack = () => {
  const [trackId, setTrackId] = useState(0);
  const [buy, setBuy] = useState();
  const [loaded, setLoaded] = useState(false);
  const alert = useAlert();

  const handleTrackSearch = (evt) => {
    evt.preventDefault();
    if (trackId.length > 0) {
      const dbFirebase = getFirestore();
      const queryFilter = doc(dbFirebase, "orders", trackId);

      getDoc(queryFilter)
        .then((resp) => {
          setBuy(resp.data());
          setLoaded(true);

          console.log(resp);
          if (resp.data() === undefined) alert.error("No se econtro la compra ");
          else alert.success("Se econtro la compra ");
        })
        .catch((e) => alert.error("Ocurrio un eror en la busqueda"));
    } else {
      alert.error("Ingresa algo para buscar"); //Remplace for alert
    }
  };

  const BuyerItems = () => {
    //retorna los items comprados
    let { items } = buy;
    return items.map((element, index) => (
      <CartDetail
        key={index}
        title={element.title}
        quantity={element.quantity}
        price={element.price}
        canDelete={false}
      />
    ));
  };
  const FullFilledRequest = ({ buy }) => {
    if (loaded) {
      if (buy !== undefined) {
        return (
          <div className="mt-5 lg:w-6/12 m-auto">
            <h2 className="font-bold text-xl">Fecha de compra: {buy.date}</h2>
            <h1 className="font-bold">Productos comprados:</h1>
            <BuyerItems />
            <h2 className="font-bold text-xl">Total: {priceParser(buy.total)}</h2>
          </div>
        );
      } else {
        return (
          <>
            <h1 className="text-bold text-red-900 text-center">No se encontro ninguna orden con ese identificador</h1>
          </>
        );
      }
    }

    return null;
  };
  return (
    <div className="flex flex-col  items-center bg-sky-100 min-h-screen">
      <div className="w-10/12">
        <div className="mt-2  m-auto animate-load">
          <form onSubmit={handleTrackSearch} className="flex mt-2 w-8/12 m-auto">
            <input
              className="block w-full border-2 rounded-md px-1 py-3"
              type="text"
              placeholder="Ingresa el identificador de seguimiento"
              required
              onChange={(evt) => setTrackId(evt.target.value)}
            />
            <Button type="submit" title="Buscar" />
          </form>
        </div>
        <FullFilledRequest buy={buy} />
      </div>
    </div>
  );
};

export default OrderTrack;
