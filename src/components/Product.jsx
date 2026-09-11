import React from "react";

const Product = ({
  ProductList = [],
  softAddToCart,
  sendForCart,
  cart = [],
}) => {
  const availableProducts = ProductList?.filter(
    (product) => !cart.some((cartItem) => cartItem.id === product.id),
  );

  if (availableProducts?.length == 0) {
    return (
      <>
        <div
          style={{
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "36px",
            fontFamily: "sans-serif",
            color: "grey",
          }}
        >
          Product Section is empty
        </div>
      </>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        height: "500px",
        overflowY: "auto",
      }}
    >
      {availableProducts?.map((data, i) => {
        const isAdded = sendForCart.some((item) => item.id === data.id);
        return (
          <>
            <div
              key={`index${i + 1}`}
              style={{
                display: "flex",
                background: "#e7e7e7",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 18px",
                borderRadius: "17px",
                gap: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "20px",
                    textTransform: "capitalize",
                    fontFamily: "sans-serif",
                  }}
                >
                  {data?.productName}
                </p>
                <p
                  style={{ fontSize: "20px", fontFamily: "sans-serif" }}
                >{`₹ ${data?.price}`}</p>
              </div>
              <button
                onClick={() => softAddToCart(data)}
                style={{
                  border: "none",
                  height: "35px",
                  width: "60px",
                  borderRadius: "9px",
                  textAlign: "center",
                  fontSize: "16px",
                  background: isAdded ? "#777" : "forestgreen",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {isAdded ? "Added" : "Add"}
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Product;
