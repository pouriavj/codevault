import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://snippet-editor-lake.vercel.app",
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "weekly",
    },
  ];
}