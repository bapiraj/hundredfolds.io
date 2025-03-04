import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [folds, setFolds] = useState([]);

  useEffect(() => {
    fetch("/folds.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        return response.json();
      })
      .then((data) => setFolds(data))
      .catch((error) => console.error("Error loading articles:", error));
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Top Folds</h2>
      <div className="article-list">
        {folds.map((fold) => (
          <Link to={`/article/${fold.id}`} key={fold.id} className="article-card">
            <h3 className="article-title">{fold.title}</h3>
            <p className="article-subtitle">{fold.subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
