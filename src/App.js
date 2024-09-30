import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/Navigation/NavBar'
import NotFound from './components/Screen/NotFound'
import ItemListContainer from './components/Item/ItemListContainer'
import Cart from './components/Screen/Cart'
import ItemDetailContainer from './components/ItemDetail/ItemDetailContainer'

function App() {
  return (
    <div className="font-Montserrat ">
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/category/:catId" element={<ItemListContainer />} />
        <Route path="/discount" element={<ItemListContainer discount={true} />} />
      </Routes>
    </div>
  )
}

export default App
