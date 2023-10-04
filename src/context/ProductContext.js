import React, { createContext, useState } from "react";
import Product from "../model/Product";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const initProductList = [
    new Product(1, "My principle", 34, "USA", true),
    new Product(2, "12 Rules", 24, "USA", false),
  ];
  const [productData, setProductData] = useState(initProductList);

  return (
    <ProductContext.Provider value={{ productData, setProductData }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
