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
    defineField({
      name: "demoReelVimeoId",
      title: "Demo reel Vimeo ID",
      description:
        "Numeric Vimeo ID for the demo reel lightbox (Work page + home Reel modal). E.g. 1191542036",
      type: "string",
    }),
    defineField({
      name: "demoReelVimeoHash",
      title: "Demo reel Vimeo hash",
      description: "The h= token from the Vimeo embed URL (required for unlisted videos).",
      type: "string",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
