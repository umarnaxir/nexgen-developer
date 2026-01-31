import { Building2, Globe, Heart, Briefcase, Users, Code2, Calendar } from "lucide-react";

export const projects = [
  {
    id: 1,
    title: "Dr. Jibran Bashir – Orthopedic Care Website",
    description: "A professional medical website showcasing services, expertise, and online appointment booking with a clean and responsive UI.",
    detailedDescription: "A comprehensive medical website designed for Dr. Jibran Bashir's orthopedic practice. The platform features a modern, clean interface that builds trust with patients while providing essential information about services, doctor's expertise, and treatment options. The website includes an integrated appointment booking system, patient testimonials, and detailed service pages.",
    image: "/images/projects/project2.png",
    link: "https://drjibranbashir.com",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design", "SEO Optimization"],
    category: "Medical Website",
    features: [
      "Online Appointment Booking System",
      "Service & Treatment Information",
      "Doctor's Profile & Expertise",
      "Patient Testimonials",
      "Contact Forms & Location Maps",
      "Mobile-Responsive Design",
      "Fast Loading & SEO Optimized",
      "Secure Patient Data Handling"
    ],
    duration: "2 months",
    client: "Dr. Jibran Bashir",
    icon: Building2,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Hotel Sea View – Luxury Stay Website",
    description: "A modern hotel website displaying rooms, gallery, and contact details with an attractive landing section and smooth navigation.",
    detailedDescription: "An elegant and luxurious website for Hotel Sea View, designed to showcase the hotel's premium accommodations and services. The website features stunning visual galleries, detailed room descriptions, amenities information, and an easy-to-use booking interface. The design emphasizes the hotel's luxury brand while maintaining excellent user experience across all devices.",
    image: "/images/projects/project3.png",
    link: "https://thehotelseaview.in",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Image Optimization", "Booking Integration", "Google Maps API"],
    category: "Hospitality Website",
    features: [
      "Interactive Room Gallery",
      "Online Booking System",
      "Amenities Showcase",
      "Location & Directions",
      "Contact & Inquiry Forms",
      "Responsive Mobile Design",
      "High-Quality Image Display",
      "Smooth Animations & Transitions"
    ],
    duration: "2.5 months",
    client: "Hotel Sea View",
    icon: Globe,
    color: "bg-amber-500"
  },
  {
    id: 3,
    title: "Kindness Towards Humanity Foundation",
    description: "A nonprofit organization website highlighting mission, team, gallery, and donation support with a user-friendly design.",
    detailedDescription: "A compassionate and impactful website for the Kindness Towards Humanity Foundation, designed to inspire visitors and facilitate donations. The platform effectively communicates the organization's mission, showcases their humanitarian work through galleries and stories, and provides secure donation options. The design balances emotional connection with clear calls-to-action.",
    image: "/images/projects/project1.png",
    link: "https://kindnesstowardshumanity.in",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Payment Gateway Integration", "Content Management", "Social Media Integration"],
    category: "Nonprofit Website",
    features: [
      "Mission & Vision Pages",
      "Team & Volunteer Information",
      "Project Gallery & Stories",
      "Secure Donation System",
      "Event Calendar & Updates",
      "Contact & Volunteer Forms",
      "Social Media Integration",
      "Impact Reports & Transparency"
    ],
    duration: "3 months",
    client: "Kindness Towards Humanity Foundation",
    icon: Heart,
    color: "bg-red-500"
  },
  {
    id: 4,
    title: "Saibbyweb Office Management Dashboard",
    description: "A web-based system for managing employees, attendance, and documents with secure login and clean UI.",
    detailedDescription: "A comprehensive office management dashboard designed for Saibbyweb to streamline internal operations. The system includes employee management, attendance tracking, document storage, and administrative controls. Built with security and efficiency in mind, the dashboard provides a clean, intuitive interface for managing day-to-day office tasks and maintaining organizational records.",
    image: "/images/projects/project4.png",
    link: "https://sw-office.vercel.app",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Authentication System", "Database Integration", "File Upload System", "Dashboard Analytics"],
    category: "Management System",
    features: [
      "Employee Management System",
      "Attendance Tracking & Reports",
      "Document Storage & Management",
      "Secure User Authentication",
      "Role-Based Access Control",
      "Dashboard Analytics",
      "File Upload & Download",
      "Admin Panel & Settings"
    ],
    duration: "4 months",
    client: "Saibbyweb",
    icon: Briefcase,
    color: "bg-purple-500"
  }
];

export const stats = [
  { label: "Projects Completed", value: "20+", icon: Briefcase },
  { label: "Happy Clients", value: "10+", icon: Users },
  { label: "Technologies Used", value: "30+", icon: Code2 },
  { label: "Years Experience", value: "2+", icon: Calendar }
];
