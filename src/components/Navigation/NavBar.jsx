import React from 'react'
import NavLink from './NavLink'
import brandImage from '../../assets/images/brand.png'
import Icon from '../Utilities/Icon'
import hoverImage from '../../assets/images/brand-hover.png'
import CartWidget from './CartWidget'
const NavBar = () => {
  const categories = [
    { name: 'Ofertas', path: '/discount' },
    { name: 'Juegos Digitales', path: '/category/cd-key' },
    { name: 'Juegos Físicos', path: '/category/fisic' },
    { name: 'Periféricos', path: '/category/peripherals' },
    { name: 'Consolas', path: '/category/console' }
  ]

  return (
    <div className="w-full top-0 fixe   p-6 bg-sky-900 font-Montserrat ">
      <div className="lg:flex lg:flex-row  text-white w-4/5 m-auto ">
        <NavLink name="DigiGames" extraStyle="font-light text-2xl" directionPath="/">
          <Icon sourceImage={brandImage} sourceHover={hoverImage} size="w-10" />
        </NavLink>
        <div className="flex flex-row ml-auto">
          {categories.map((i) => (
            <NavLink name={i.name} directionPath={i.path} key={i.name} />
          ))}
        </div>
        <NavLink directionPath="/cart">
          <CartWidget />
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar
