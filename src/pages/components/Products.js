import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import ProductItem from "./ProductItem";
import { fetchProducts } from "../../api/apiService";
import useProduct from "../../hooks/useProduct";

function Products() {
  const { productData, setProductData } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        console.log(products);

        setProductData(products);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleRemoveProduct = (product) => {
    setProductData((products) => {
      return products.filter((el) => el.id !== product.id);
    });
  };

  const handleClickProduct = (product) => {
    console.log(product);
    navigate(`/${product.productSlug}`);
  };

  const productItems = productData.map((product) => {
    return (
      <ProductItem
        key={product.id}
        product={product}
        remove={handleRemoveProduct}
        handleClickProduct={handleClickProduct}
      />
    );
  });

  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-between my-3">
          <h4>Product List </h4>
          <Link className="btn btn-primary" to="/create">
            Add Product
          </Link>
        </div>

        <article>
          <div className="row">{productItems}</div>
        </article>
      </div>
    </section>
  );
}

export default Products;
