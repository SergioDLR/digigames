import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemList from "./components/Item/ItemList";
import productsJSON from "./components/products.json";

function App() {
  return (
    <div>
      <NavBar />
      <ItemListContainer>
        <ItemList items={productsJSON} />
      </ItemListContainer>
    </div>
  );
}

export default App;
