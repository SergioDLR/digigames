import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import RoutesDef from "./components/Navigation/RoutesDef";
import CartContextProvider from "./components/Context/CartContext";

function App() {
  return (
    <CartContextProvider>
      <div className="font-Montserrat ">
        <NavBar />
        <RoutesDef />
      </div>
    </CartContextProvider>
  );
}

export default App;
