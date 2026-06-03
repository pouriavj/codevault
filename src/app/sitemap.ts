import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.codevault.ir",
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "weekly",
    },
  ];
}
