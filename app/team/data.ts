import { ArrowRight, Building2, Code2, Brain, Search, Layers } from "lucide-react";

export const teamMembers = [
  {
    name: "Umar Nazir",
    title: "Software Engineer",
    description:
      "Umar Nazir is a Software Engineer and SEO Executive at NexGen Developer and a full-time employee at Saibbyweb. He leads the NexGen team with a vision to deliver scalable and high-quality digital solutions.",
    image: "/images/team/me.JPG",
    company: "Saibbyweb",
    icon: Code2,
    color: "from-blue-500/10 to-blue-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Khalid Jan",
    title: "Back-End Engineer",
    description:
      "Khalid Jan is a Back-End Engineer at Harmukh Technologies, specializing in secure APIs, server-side development, and scalable backend systems.",
    image: "/images/team/khalid.jpeg",
    company: "Harmukh Technologies",
    icon: Layers,
    color: "from-purple-500/10 to-purple-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Syed Owais Qadri",
    title: "AI Engineer",
    description:
      "Syed Owais Qadri is an AI Engineer at Saibbyweb with experience in machine learning, data analysis, and intelligent automation.",
    image: "/images/team/owais.jpg",
    company: "Saibbyweb",
    icon: Brain,
    color: "from-green-500/10 to-green-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Waseem Tariq",
    title: "Full Stack Software Engineer",
    description:
      "Waseem Tariq is a Full Stack Software Engineer experienced in building end-to-end web applications using modern frontend and backend technologies.",
    image: "/images/team/waseem.jpeg",
    company: "Freelance",
    icon: Code2,
    color: "from-pink-500/10 to-pink-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Ummar Farooq",
    title: "Software Developer Freelancer",
    description:
      "Ummar Farooq is a Software Developer and Freelancer, experienced in delivering custom software solutions and quality development projects for clients across various domains.",
    image: "/images/team/ummar.jpeg",
    company: "Freelancer",
    icon: Code2,
    color: "from-cyan-500/10 to-cyan-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },  
  {
    name: "Mohsin Jan",
    title: "Digital Marketing Analyst",
    description:
      "Mohsin Jan is an Digital Marketing Analyst based in Hyderabad, helping businesses improve online visibility and organic growth.",
    image: "/images/team/mohsin-jan.jpeg",
    company: "Bitlogic Systems",
    icon: Search,
    color: "from-orange-500/10 to-orange-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};
