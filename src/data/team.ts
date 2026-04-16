export type TeamMember = {
  name: string;
  role: string;
  /** Landscape/wide shot (top row of card when hovered) */
  wideImage?: string;
  /** Close portrait (default card image) */
  closeImage?: string;
};

/**
 * Team roster — sourced from the brand guide site.
 * Members without photos render as a styled charcoal-light card.
 * Images live in /public/images/team/ (snake_case filenames).
 */
export const team: TeamMember[] = [
  {
    name: "Tim Moore",
    role: "Founder",
    wideImage: "/images/team/tim_moore-8.jpg",
    closeImage: "/images/team/tim_moore-9.jpg",
  },
  {
    name: "Jeff McKown",
    role: "President",
    wideImage: "/images/team/jeff_mckown-4.jpg",
    closeImage: "/images/team/jeff_mckown-3.jpg",
  },
  {
    name: "Erin Cullaro",
    role: "Vice President",
    wideImage: "/images/team/erin_cullaro-1.jpg",
    closeImage: "/images/team/erin_cullaro-4.jpg",
  },
  {
    name: "Anthony Santa",
    role: "Director of Sports + Entertainment",
    wideImage: "/images/team/anthony_santa-1.jpg",
    closeImage: "/images/team/anthony_santa-3.jpg",
  },
  {
    name: "Susan Mulvey",
    role: "Executive Producer",
    closeImage: "/images/team/susan_mulvey-1.jpg",
  },
  {
    name: "Vanessa Diaz",
    role: "Director",
    wideImage: "/images/team/vanessa_diaz-6.jpg",
    closeImage: "/images/team/vanessa_diaz-3.jpg",
  },
  {
    name: "Jason Blanc",
    role: "Director",
    wideImage: "/images/team/jason_blanc-6.jpg",
    closeImage: "/images/team/jason_blanc-7.jpg",
  },
  {
    name: "Ryan Sebastian",
    role: "Director of Post Production",
    wideImage: "/images/team/ryan_sebastyan-3.jpg",
    closeImage: "/images/team/ryan_sebastyan-2.jpg",
  },
  {
    name: "Kevin DeLucia",
    role: "Director of Visual Effects",
  },
  {
    name: "Kayla Gremer",
    role: "Project Manager",
    wideImage: "/images/team/kayla_gremer_foreid-1.jpg",
    closeImage: "/images/team/kayla_gremer_foreid-5.jpg",
  },
  {
    name: "Lucy Nash",
    role: "Production Coordinator",
    wideImage: "/images/team/lucy_nash-3.jpg",
    closeImage: "/images/team/lucy_nash-4.jpg",
  },
  {
    name: "Alex Segovia Walle",
    role: "Cinematographer",
  },
  {
    name: "Alec Piper",
    role: "Media Manager + Colorist",
    wideImage: "/images/team/alec_pieper-5.jpg",
    closeImage: "/images/team/alec_pieper-1.jpg",
  },
  {
    name: "Ricardo Campbell",
    role: "Marketing Editor + Shooter",
    wideImage: "/images/team/ricardo_campbell-2.jpg",
    closeImage: "/images/team/ricardo_campbell-1.jpg",
  },
  {
    name: "Cory Draper",
    role: "Senior Editor",
    wideImage: "/images/team/cory_draper-1.jpg",
    closeImage: "/images/team/cory_draper-5.jpg",
  },
  {
    name: "Noah Lambrix",
    role: "Editor + Motion Designer",
    wideImage: "/images/team/noah_lambrix-4.jpg",
    closeImage: "/images/team/noah_lambrix-5.jpg",
  },
  {
    name: "Jon Davila",
    role: "Consultant",
  },
];
