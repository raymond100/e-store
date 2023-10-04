import React from "react";
function ProductItem({ product, handleClickProduct }) {
  return (
    <div className="col-md-3" onClick={() => handleClickProduct(product)}>
      <div className="card mb-3">
        <img
          className="card-img-top"
          src={product.imageUrl}
          alt="the product"
        />
        <div className="card-body">
          <p className="card-text">{product.productName}</p>
          <p className="card-text font-weight-bold">{product.productPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
