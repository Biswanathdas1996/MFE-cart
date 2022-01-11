import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SimpleGrid, Text, ChakraProvider } from "@chakra-ui/react";

import Cart from "./components/Cart";
import "./index.css";

const App = () => {
  const [cartCountItem, setCartCountItem] = useState(0);
  const cartCount = (count) => {
    setCartCountItem(count);
  };
  return (
    <>
      <Cart />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
