import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import fm from 'front-matter';
import { Helmet } from "react-helmet";

const MarkdownPage = () => {
  const { id } = useParams();
  const [metadata, setMetadata] = useState({ title: "Loading...", description: "" });
  const [content, setContent] = useState("");
  const [copiedState, setCopiedState] = useState({});

  useEffect(() => {
    fetch(`/markdown/${id}.md`)
      .then((res) => res.text())
      .then((text) => {
        const markdownContext = fm(text);
        setContent(markdownContext.body);
        setMetadata(markdownContext.attributes);
      })
      .catch(() => {
        setContent("# Article Not Found");
      });
  }, [id]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": metadata.title || "Hundred Folds",
    "author": {
      "@type": "Person",
      "name": "Shanmukha Sai Bapiraj Vinnakota"
    },
    "datePublished": metadata.datePublished || "2025-01-01",
    "dateModified": metadata.dateModified || metadata.datePublished || "2025-01-01",
    "publisher": {
      "@type": "Organization",
      "name": "Hundred Folds",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/hf.svg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": metadata.mainEntityOfPage || `${window.location.origin}`
    }
  };
  
  const handleCopy = (code, blockIndex) => {
    navigator.clipboard.writeText(code);
    setCopiedState((prevState) => ({...prevState, [blockIndex]: true}));
    setTimeout(() => {
      setCopiedState((prevState) => ({...prevState, [blockIndex]: false}));
    }, 2000);
  };

  return (
    <div>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <ReactMarkdown
        className="markdown-content"
        children={content}
        components={{
          code({ node, inline, className, children, ...props }) {
            const language = className?.replace("language-", "");
            const blockIndex = node.position?.start?.line || Math.random();
            const isCopied = copiedState[blockIndex]
            return !inline && language ? (
              <div className="code-block-wrapper">
                <button className={`copy-button ${isCopied ? "copied" : ""}`} onClick={() => handleCopy(children, blockIndex)}>
                  {isCopied ? "Copied!" : "Copy"}
                </button>
                <SyntaxHighlighter style={atomDark} language={language} PreTag="div" {...props}>
                  {children}
                </SyntaxHighlighter>
              </div>) : (
              <code className={className} {...props}>
                {children}
              </code>
              );
          },
        }}
      />
    </div>
  );
};

export default MarkdownPage;
