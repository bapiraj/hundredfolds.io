import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Playground = () => {
  const [plays, setPlays] = useState([]);

  useEffect(() => {
    fetch("/plays.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch plays");
        }
        return response.json();
      })
      .then((data) => setPlays(data))
      .catch((error) => console.error("Error loading plays:", error));
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Playground</h2>
      <div className="article-list">
        {plays.map((play) => (
          <Link to={`/playground/${play.id}`} key={play.id} className="article-card">
            <h3 className="article-title">{play.title}</h3>
            <p className="article-subtitle">{play.subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Playground;
