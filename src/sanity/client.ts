import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "mytelucw",
  dataset: "production",
  apiVersion: "2025-05-01",
  useCdn: true,
});
