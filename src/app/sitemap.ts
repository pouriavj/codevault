import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://codevault.ir",
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "weekly",
    },
  ];
}
