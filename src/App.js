import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import RoutesDef from "./components/Navigation/RoutesDef";
import CartContextProvider from "./components/Context/CartContext";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App() {
  //opciones para el alertprovider
  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    transition: transitions.SCALE,
  };

  return (
    <CartContextProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <div className="font-Montserrat ">
          <NavBar />
          <RoutesDef />
        </div>
      </AlertProvider>
    </CartContextProvider>
  );
}

export default App;
