import React, { useEffect, useState } from "react";
import Product from "./components/Product";
import { ProductList } from "./constants/product";

const App = ({ cart = [] }) => {
  const [sendForCart, setSendForCart] = useState([]);
  const [openModel, setOpenModel] = useState(false);

  const softAddToCart = (product) => {
    setSendForCart((prev) => {
      const alreadyAdded = prev.some((item) => item.id === product.id);

      if (alreadyAdded) {
        return prev.filter((item) => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const addToCart = () => {
    if (confirm("are you sure want to add in cart ?")) {
      window.dispatchEvent(
        new CustomEvent("add-to-cart", {
          detail: sendForCart,
        }),
      );
    }
    setOpenModel(true);
    setSendForCart([]);
  };

  const remainingProducts =
    ProductList.length - cart.length - sendForCart.length;

  useEffect(() => {
    let timer;

    if (openModel) {
      timer = setTimeout(() => {
        setOpenModel(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [openModel]);

  return (
    <div
      style={{
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "0px auto",
      }}
    >
      <h1 style={{ fontFamily: "sans-serif" }}>
        Product page {remainingProducts ? `(${remainingProducts})` : null}
      </h1>
      <Product
        ProductList={ProductList}
        softAddToCart={softAddToCart}
        sendForCart={sendForCart}
        cart={cart}
      />
      <button
        onClick={() => {
          if (sendForCart?.length > 0) {
            return addToCart();
          }
          return;
        }}
        style={{
          border: "none",
          ...(sendForCart?.length > 0
            ? { background: "forestgreen", color: "white" }
            : { background: "grey" }),
          padding: "12px 0px",
          borderRadius: "12px",
          marginTop: "12px",
          fontSize: "18px",
          cursor: sendForCart?.length > 0 ? "pointer" : "not-allowed",
        }}
      >
        Add To Cart {sendForCart?.length}
      </button>
      {openModel && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 999,
            background: "#22c55e",
            color: "white",
            padding: "14px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            fontSize: "16px",
            fontFamily: "sans-serif",
          }}
        >
          Product added to cart successfully
        </div>
      )}
    </div>
  );
};

export default App;
