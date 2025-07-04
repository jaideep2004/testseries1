import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Academic Assignment Master | Expert Academic Solutions",
  description = "Academic Assignment Master provides expert academic solutions, study materials, and professional assistance for students at all educational levels.",
  keywords = "academic assignments, assignment help, academic solutions, educational resources, study materials, academic projects",
  canonicalUrl = "",
  ogType = "website",
  ogImage = "https://academicassignmentmaster.co.in/images/hero123.png"
}) => {
  // Construct the full canonical URL
  const siteUrl = "https://academicassignmentmaster.co.in";
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO; 