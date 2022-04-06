import React from "react";
import { Routes, Route } from "react-router-dom";
import ItemListContainer from "../Item/ItemListContainer";
import NotFound from "../Screen/NotFound";
import ItemDetailContainer from "../ItemDetail/ItemDetailContainer";
import CartListContainer from "../Cart/CartListContainer";
import OrderTrack from "components/Screen/OrderTrack";
import UserSesion from "components/User/UserSesion";
import WishList from "components/User/WishList";
const RoutesDef = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<ItemListContainer />} />
      <Route path="/Cart" element={<CartListContainer />} />
      <Route path="/item/:itemId" element={<ItemDetailContainer />} />
      <Route path="/category/:catId" element={<ItemListContainer />} />
      <Route path="/discount" element={<ItemListContainer discount={true} />} />
      <Route path="/sesion" element={<UserSesion />} />
      <Route path="/ordertrack" element={<OrderTrack />} />
      <Route path="/wishlist" element={<WishList />} />
    </Routes>
  );
};

export default RoutesDef;
