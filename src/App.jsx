import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LearnCode from "./pages/LearnCode";
import CategoryPage from "./pages/CategoryPage";
import MarkdownPage from "./pages/MarkdownPage";
import About from "./pages/About";
import Playground from "./pages/Playground";
import SudokuPage from "./pages/SudokuPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-code" element={<LearnCode />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/article/:id" element={<MarkdownPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/playground/sudoku-ai" element={<SudokuPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
