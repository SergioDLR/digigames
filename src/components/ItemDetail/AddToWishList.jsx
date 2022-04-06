import Button from "components/Utilities/Button";
import React, { useState, useEffect } from "react";
import { addToWishList, isInWishList, deleteFromWishList } from "components/Firebase/wishlist";
import Spinner from "components/Utilities/Spinner";
import { activeSesion } from "components/Firebase/activeSesion";

const AddToWishList = ({ item }) => {
  const [isInWish, setIsInWish] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const addToWishListWraper = () => {
    setLoading(false);
    addToWishList(item).then(() => {
      setLoading(true);
      setIsInWish(!isInWish);
    });
  };
  const deleteFromWishListWraper = () => {
    setLoading(false);
    deleteFromWishList(item).then(() => {
      setLoading(true);
      setIsInWish(!isInWish);
    });
  };

  useEffect(() => {
    isInWishList(item).then(({ isIn }) => {
      setLoading(true);
      setIsInWish(isIn);
      activeSesion().then((resp) => setUser(resp));
    });
  }, [item]);

  const ShowButton = () => {
    if (!isInWish) {
      return <Button action={addToWishListWraper} title="Añadir a la wishlist" />;
    } else {
      return (
        <Button
          bgColor="bg-red-600"
          hover="hover:bg-red-900"
          action={deleteFromWishListWraper}
          title="Quitar de la wishlist"
        />
      );
    }
  };
  if (user !== undefined) {
    return <>{isLoading ? <ShowButton /> : <Spinner />}</>;
  } else {
    return <></>;
  }
};

export default AddToWishList;
