import { useContext } from "react";
import ProductContext from "../context/ProductContext";

export default function useProduct() {
  return useContext(ProductContext);
}
