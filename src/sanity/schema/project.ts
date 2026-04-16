import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Campaign",
          "Commercial",
          "Branded Content",
          "Sports / Entertainment",
          "Music Video",
          "Short Film",
          "VFX",
        ],
      },
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short uppercase tagline (e.g. TINY TRUCKS. BIG IMPACT.)",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Creative Development",
          "Production",
          "Post Production",
          "Post Production + VFX",
          "AI-Enhanced Workflows",
        ],
      },
    }),
    defineField({
      name: "heroType",
      title: "Hero Type",
      type: "string",
      options: { list: ["video", "image"] },
      initialValue: "image",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video URL",
      type: "url",
      description: "URL to hero video (if hero type is video)",
    }),
    defineField({
      name: "vimeoId",
      title: "Vimeo Video ID",
      type: "string",
      description:
        "Numeric Vimeo ID (e.g. 1162580352). When set, embeds the Vimeo player as the hero.",
    }),
    defineField({
      name: "vimeoHash",
      title: "Vimeo Hash Token",
      type: "string",
      description:
        "The h= token from the embed URL. Required for unlisted videos.",
    }),
    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: { hotspot: true },
      description: "Thumbnail shown in portfolio grid",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "layout",
              title: "Layout",
              type: "string",
              options: { list: ["full", "half"] },
              initialValue: "full",
            }),
          ],
          preview: {
            select: { title: "alt", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "cardImage",
    },
  },
});
