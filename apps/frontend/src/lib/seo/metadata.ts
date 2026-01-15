import { Metadata } from "next";
import { seoConfig } from "./config";

interface PageSEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description = seoConfig.description,
  canonical = "/",
  ogImage = seoConfig.defaultOGImage,
  noIndex = false,
}: PageSEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.siteName;

  return {
    title: fullTitle,
    description,
    keywords: ["portfolio", "engineering", "software development", "showcase", "nextjs", "nestjs"],
    authors: [{ name: "DevAtlas Team" }],
    creator: "DevAtlas Team",
    metadataBase: new URL(seoConfig.url),
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: seoConfig.siteName,
      images: [
        {
          url: ogImage,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: seoConfig.twitterHandle,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
