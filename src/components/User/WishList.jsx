import React, { useEffect, useState } from "react";

import { getWishList } from "components/Firebase/wishlist";
import ItemDetail from "components/ItemDetail/ItemDetail";
import Spinner from "components/Utilities/Spinner";

const WishList = () => {
  const [wishItems, setWishItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errorMsg, setMsg] = useState("Aun no tienes productos en tu lista de deseados, ¡Agrega algunos!");
  useEffect(() => {
    reloadWishList();
  }, []);
  const reloadWishList = () => {
    getWishList()
      .then(({ wish }) => {
        setWishItems(wish.products);
        setLoaded(true);
      })
      .catch((e) => {
        setLoaded(true);
        setMsg("Parece que no has iniciado sesion, inicia una para poder ver la lista de deseados");
      });
  };
  const Show = () => {
    if (loaded) {
      return (
        <>
          {wishItems.length < 1 ? (
            <div className="mt-5 animate-load">
              <h1 className="text-2xl">{errorMsg}</h1>
            </div>
          ) : (
            <>
              <h1 className="font-bold mt-5 animate-load">Tu lista de deseados</h1>
              <div className="grid grid-cols-1 w-10/12 mx-auto ">
                {wishItems.map((item, index) => (
                  <ItemDetail loading={true} item={item} key={index} />
                ))}
              </div>
            </>
          )}
        </>
      );
    } else {
      return <Spinner />;
    }
  };

  return (
    <div className="flex flex-col  items-center bg-sky-100 font-Montserrat min-h-screen h-full">
      <Show />
    </div>
  );
};

export default WishList;
