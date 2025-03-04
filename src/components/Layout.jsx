import React from "react";
import { Link } from "react-router-dom";


const Layout = ({ children }) => {
  return (
    <div id="root">
      {/* Header */}
      <header>
        {/* Title / Logo */}
        <h1>
          <Link to="/">Hundred Folds</Link>
        </h1>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          <Link to="/">Home</Link>
          <Link to="/learn-code">Learn & Code</Link>
          <Link to="/playground">Playground</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        <div className="left-ad">
          <p>Ad Placeholder</p>
        </div>
        <div className="content-box">{children}</div>

        <div className="right-ad">
          <p>Ad Placeholder</p>
        </div>
      </main>

      <footer>
        <p>© 2025 Hundred Folds</p>
      </footer>
    </div>
  );
};

export default Layout;
