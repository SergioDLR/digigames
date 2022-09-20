import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import RoutesDef from "./components/Navigation/RoutesDef";
import CartContext from "./components/Cart/CartContext";

function App() {
  return (
    <CartContext>
      <div className="font-Montserrat ">
        <NavBar />
        <RoutesDef />
      </div>
    </CartContext>
  );
}

export default App;
