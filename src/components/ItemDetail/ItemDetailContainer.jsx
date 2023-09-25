import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productsJSON from '../products.json'
import ItemDetail from './ItemDetail'
import backArrowImg from '../../assets/images/back-arrow.png'
import Icon from '../Utilities/Icon'
import Button from '../Utilities/Button'

const ItemDetailContainer = () => {
  const { itemId } = useParams()
  const [product, setProduct] = useState({})

  const searchId = parseInt(itemId)
  const navigate = useNavigate()

  useEffect(() => {
    let loadData = new Promise((resolve) => {
      setTimeout(() => resolve(productsJSON.filter((pItem) => pItem.id === searchId).shift()), 3000)
    })
    loadData.then((data) => {
      setProduct(data)
    })
  }, [searchId])

  const goBack = () => {
    if (navigate.length > 0) navigate(-1)
    else navigate('/')
  }

  return (
    <>
      <div className="flex flex-col  items-center bg-sky-100 min-h-screen">
        <div className="mr-auto w-1/4 mt-3 flex justify-center">
          <Button className={'rounded-full  '} action={goBack}>
            <Icon sourceImage={backArrowImg} />
          </Button>
        </div>

        <ItemDetail item={product} />
      </div>
    </>
  )
}

export default ItemDetailContainer
