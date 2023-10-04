import React from "react";

import { useState, useEffect } from "react";
import { createProduct } from "../../api/apiService";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const initProduct = {
    productName: "",
    productPrice: "",
    productOrigin: "",
    productQuantity: 0,
    productSlug: "",
  };
  const [product, setProduct] = useState(initProduct);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [product]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(product);
      setProduct(initProduct);
      setErrorMessage(null);
      navigate("/");
    } catch (err) {
      console.error("Error creating product:", err);

      if (
        err.message ===
        `Product with slug '${product.productSlug}' already exists.`
      ) {
        setErrorMessage(`Product with the same slug already exists.`);
      } else {
        setErrorMessage(`An error occurred while creating the product.`);
      }
    }
  };

  return (
    <section>
      <div className="container mx-auto my-5">
        <p
          className={errorMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
        <h4>Add new Product</h4>
        <form onSubmit={handleSubmit} className="mb-3">
          <div class="form-group mb-3">
            <label for="productName">Name</label>
            <input
              type="text"
              name="productName"
              class="form-control"
              id="productName"
              aria-describedby="nameHelp"
              placeholder="Product Name"
              value={product.productName}
              onChange={handleFieldChange}
            />
          </div>
          <div class="form-group mb-3">
            <label for="productSlug">Slug</label>
            <input
              type="text"
              name="productSlug"
              required
              class="form-control"
              id="productSlug"
              aria-describedby="SlugHelp"
              placeholder="Product Slug"
              value={product.productSlug}
              onChange={handleFieldChange}
            />
          </div>
          <div class="form-group mb-3">
            <label for="productPrice">Price</label>
            <input
              type="text"
              name="productPrice"
              class="form-control"
              id="productPrice"
              placeholder="Product price"
              value={product.productPrice}
              onChange={handleFieldChange}
            />
          </div>
          <div class="form-group mb-3">
            <label for="productOrigin">Origin</label>
            <input
              type="text"
              name="productOrigin"
              class="form-control"
              id="productOrigin"
              placeholder="Product Origin"
              value={product.productOrigin}
              onChange={handleFieldChange}
            />
          </div>
          <div class="form-group mb-3">
            <label for="productQuantity">Quantity</label>
            <input
              type="number"
              name="productQuantity"
              class="form-control"
              id="productQuantity"
              placeholder="Product quantity"
              value={product.productQuantity}
              onChange={handleFieldChange}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
}

export default Create;
