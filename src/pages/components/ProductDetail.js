import React from "react";
import { useParams, Link } from "react-router-dom";

import useProduct from "../../hooks/useProduct";

function ProductDetail() {
  const { productSlug } = useParams();
  const { productData } = useProduct();

  const product = productData.find(
    (product) => product.productSlug === productSlug
  );

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      {product.productName}
      <div className="d-flex">
        <Link className="btn btn-primary" to="/edit">
          Edit Product
        </Link>
        <button className="btn btn-danger" onClick={() => console.log(product)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
