import React, { useEffect } from 'react';

export default function SEOHead({
  title = "Dr. Ombeer R. Pal | Premium Ayurvedic Clinic & Panchakarma Centre",
  description = "Experience authentic Ayurveda, Agnikarma, Viddhakarma & Panchakarma at Girija Clinic under Dr. Ombeer R. Pal & Dr. Chandrakumar Deshmukh. Root cause healing for joint pain, spine & neurological disorders.",
  keywords = "Ayurvedic clinic, Dr Ombeer R Pal, Agnikarma, Viddhakarma, Panchakarma, sciatica treatment, slip disc ayurveda, Dr Chandrakumar Deshmukh, joint pain relief, holistic health",
  canonicalUrl,
  schema
}) {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper function to set meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update basic meta tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', 'Dr. Ombeer R. Pal');

    // Update Open Graph tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Girija Ayurvedic Clinic');

    // Update JSON-LD Schemas
    const existingSchema = document.getElementById('json-ld-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    const defaultSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Girija Ayurvedic Clinic",
        "url": window.location.origin,
        "logo": `${window.location.origin}/logo.png`,
        "description": "Premium Ayurvedic Healthcare Clinic specializing in Agnikarma, Viddhakarma, Panchakarma, and Neurological Rehabilitation.",
        "telephone": "+1-555-019-2834",
        "email": "contact@girijaclinic.com",
        "medicalSpecialty": ["Ayurvedic", "Neurology", "Musculoskeletal", "PainManagement"],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Healthcare Ave, Medical District, Suite 100",
          "addressLocality": "Healthcare City",
          "addressCountry": "IN"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": "Dr. Ombeer R. Pal",
        "jobTitle": "Lead Senior Ayurvedic Physician & Panchakarma Specialist",
        "medicalSpecialty": "Ayurveda",
        "worksFor": {
          "@type": "MedicalOrganization",
          "name": "Girija Ayurvedic Clinic"
        },
        "description": "Specialist in Agnikarma thermal micro-cautery, Viddhakarma needling, and classical Panchakarma therapy."
      },
      {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": "Dr. Chandrakumar Deshmukh",
        "jobTitle": "Chief Medical Officer & Founder",
        "medicalSpecialty": "Neurology & Ayurveda",
        "worksFor": {
          "@type": "MedicalOrganization",
          "name": "Girija Ayurvedic Clinic"
        },
        "description": "Neurological disorders specialist with MD (Ayurveda) and PhD in Neurology."
      }
    ];

    const schemasToInject = schema ? [...defaultSchemas, schema] : defaultSchemas;

    const scriptTag = document.createElement('script');
    scriptTag.id = 'json-ld-schema';
    scriptTag.type = 'application/ld+json';
    scriptTag.innerHTML = JSON.stringify(schemasToInject);
    document.head.appendChild(scriptTag);

  }, [title, description, keywords, schema]);

  return null;
}
