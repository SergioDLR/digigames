import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import RoutesDef from "./components/Navigation/RoutesDef";
import CartContextProvider from "./components/Context/CartContext";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App() {
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
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
