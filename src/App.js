import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import ItemListContainer from "./components/ItemListContainer";
function App() {
  return (
    <div>
      <NavBar />
      <ItemListContainer greeting={"Soy un Item list container, ahora con props"} />
    </div>
  );
}

export default App;
