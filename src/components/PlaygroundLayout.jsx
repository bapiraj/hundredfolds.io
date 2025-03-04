import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const PlaygroundLayout = ({ title, description, image, screenshot, datePublished, dateModified, children }) => {
  const location = useLocation();  // Get current URL dynamically

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "description": description,
    "applicationCategory": "EducationalGame",
    "operatingSystem": "Web",
    "author": {
      "@type": "Person",
      "name": "Shanmukha Sai Bapiraj Vinnakota",
      "affiliation": {
      "@type": "Organization",
      "name": "Hundred Folds",
      "url": `${window.location.origin}`
      }
    },
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
      "@id": `${window.location.origin}${location.pathname}`
    },
    "datePublished": datePublished || "2025-01-01",
    "dateModified": dateModified || datePublished || "2025-01-01",
    "image": `${window.location.origin}${image || '/hf.svg'}`,
    "screenshot":`${window.location.origin}${screenshot || '/hf.svg'}`,
    "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={structuredData.image} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <div className="playground-container">

        {children}
      </div>
    </>
  );
};

export default PlaygroundLayout;
