import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LearnCode = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/categories/categories.json")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error loading categories:", error));
  }, []);

  return (
    <div className="learn-code-container">
      <div className="category-grid">
        {categories.map((category) => (
          <Link to={`/category/${category.id}`} key={category.id} className="category-card">
            <h3>{category.title}</h3>
            <p>{category.Description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LearnCode;
