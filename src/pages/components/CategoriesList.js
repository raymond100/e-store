import React from "react";
import { Link } from "react-router-dom"; // If using React Router

const CategoriesList = () => {
  // Sample list of categories (you can replace this with your own data)
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Books" },
  ];

  return (
    <ul style={{ width: "100%", borderRight: "1px black" }}>
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/products?category=${category.id}`} // Replace with your category-specific route
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          style={{
            width: "100%",
            padding: "10px",
            textDecoration: "none", // Remove default link underline
          }}
        >
          {category.name}
        </Link>
      ))}
    </ul>
  );
};

export default CategoriesList;
