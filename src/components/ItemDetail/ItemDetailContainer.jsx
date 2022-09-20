import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsJSON from "../products.json";
import FocusImg from "../Utilities/FocusImg";
import ItemDetail from "./ItemDetail";
import srcImg from "../../assets/images/brand.png";
import backArrowImg from "../../assets/images/back-arrow.png";
import Icon from "../Utilities/Icon";
import Button from "../Utilities/Button";
import { useNavigate } from "react-router-dom";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const searchId = parseInt(itemId);
  const navigate = useNavigate();
  const [showFocus, setShowFocus] = useState(false);
  const [sourceFocus, setSourceFocus] = useState(srcImg);
  const activeFocus = (imgSource) => {
    setShowFocus(true);
    setSourceFocus(imgSource);
  };

  useEffect(() => {
    let loadData = new Promise((resolve) => {
      setTimeout(() => resolve(productsJSON.filter((pItem) => pItem.id === searchId).shift()), 300);
    });
    loadData.then((data) => {
      setProduct(data);
      setLoading(true);
    });
  }, [searchId]);

  const goBack = () => {
    if (navigate.length > 0) navigate(-1);
    else navigate("/");
  };

  return (
    <>
      <div className="flex flex-col  items-center bg-sky-100 min-h-screen">
        <div className="mr-auto w-1/4 mt-3 flex justify-center">
          <Button className={"rounded-full  "} action={goBack}>
            <Icon sourceImage={backArrowImg} />
          </Button>
        </div>
        <ItemDetail item={product} loading={loading} activeFunction={activeFocus} />
      </div>
      <FocusImg active={showFocus} imgSource={sourceFocus} close={setShowFocus} />
    </>
  );
};

export default ItemDetailContainer;
