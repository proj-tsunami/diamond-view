import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "demoReel",
      title: "Demo reel (homepage hero)",
      description:
        "Upload an MP4 to replace the homepage hero reel. Falls back to the bundled /video/demo-reel.mp4 if empty.",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "demoReelPoster",
      title: "Demo reel poster",
      description:
        "Optional still frame shown before the reel loads. Falls back to /images/hero-styleframe.jpg.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
