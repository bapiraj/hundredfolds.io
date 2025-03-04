import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [folds, setFolds] = useState([]);

  useEffect(() => {
    fetch("/categories/categories.json")
      .then((response) => response.json())
      .then((data) => {
        const foundCategory = data.find((cat) => cat.id === categoryId);
        setCategory(foundCategory);
      })
      .catch((error) => console.error("Error loading category:", error));

    fetch("/folds.json")
      .then((response) => response.json())
      .then((data) => setFolds(data))
      .catch((error) => console.error("Error loading folds:", error));
  }, [categoryId]);

  if (!category) return <h2>Loading...</h2>;

  return (
    <div className="category-articles-container">
      <h2>{category.title}</h2>
      <div className="article-list">
        {category.items.length === 0 ? (
          <p>No articles available in this category.</p>
        ) : (
          category.items.map((itemId) => {
            const article = folds.find((fold) => fold.id === itemId);
            return article ? (
              <Link to={`/article/${article.id}`} key={article.id} className="article-card">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-subtitle">{article.subtitle}</p>
              </Link>
            ) : null;
          })
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
