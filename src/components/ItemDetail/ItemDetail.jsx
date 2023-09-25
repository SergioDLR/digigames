import React, { useState, useContext } from 'react'
import Card from '../Utilities/Card'

import ItemCount from './ItemCount'

import { Context } from '../Cart/CartContext'

const ItemDetail = ({ item }) => {
  const [cantidad, setCantidad] = useState(0)

  const { addItem } = useContext(Context)

  const onAdd = (cant) => {
    addItem(item, cant)
    setCantidad(cantidad + cant)
  }

  return (
    <div className="w-3/4 xl:w-1/2 m-auto mt-3  ">
      <Card>
        <>
          <div className="lg:flex sm:flex-col lg:flex-row animate-load ">
            <div className="lg:ml-auto">
              <img className="w-auto m-auto cursor-pointer " src={item.pictureUrl} alt="" />
            </div>
            <div className="sm:flex sm:flex-col  lg:w-1/2 lg:ml-auto">
              <h1 className="text-2xl font-bold mt-2">{item.title}</h1>
              <h2 className="text-xl font-bold ">$ {item.price}</h2>
              <h3 className="text-base">{item.description}</h3>
              <ItemCount productName={item.title} onAdd={onAdd} />
            </div>
          </div>
        </>
      </Card>
    </div>
  )
}

export default ItemDetail
