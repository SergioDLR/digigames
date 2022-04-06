import React, { useEffect, useState } from "react";

import { getWishList } from "components/Firebase/wishlist";
import ItemList from "components/Item/ItemList";
import Spinner from "components/Utilities/Spinner";

const WishList = () => {
  const [wishItems, setWishItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getWishList().then(({ wish }) => {
      setWishItems(wish.products);
      setLoaded(true);
    });
  }, []);

  const Show = () => {
    if (loaded) {
      return (
        <>
          {wishItems.length < 1 ? (
            <div className="mt-5">
              <h1 className="text-2xl">Aun no tienes productos en tu wishlist, ¡Agrega algunos!</h1>
              <h1 className="text-2xl text-center">🤩</h1>
            </div>
          ) : (
            <ItemList items={wishItems} loaded={loaded} />
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
