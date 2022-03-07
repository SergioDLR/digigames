import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemCount from "./components/ItemCount";
function App() {
  return (
    <div>
      <NavBar />
      <ItemListContainer greeting={"Soy un Item list container, ahora con props"}>
        <ItemCount productName="Zapa naiki" stock={10} initial={1} />
      </ItemListContainer>
    </div>
  );
}

export default App;
