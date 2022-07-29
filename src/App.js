import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import RoutesDef from "./components/Navigation/RoutesDef";
import CartContext from "./components/Cart/CartContext";

function App() {
  return (
    <div className="font-Montserrat ">
      <CartContext>
        <NavBar />
        <RoutesDef />
      </CartContext>
    </div>
  );
}

export default App;
