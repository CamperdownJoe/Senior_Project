import { FeatureLdg, InfoLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "Effortless Bookmark Organization",
    description:
      "Transform your chaotic bookmarks into a well-organized collection. Our AI-powered system helps you clean up and structure your bookmarks effortlessly.",
    image: "/_static/illustrations/Bookmark.webp", // You'll need to add this image
    list: [
      {
        title: "AI-Powered",
        description: "Intelligent categorization and organization of your bookmarks.",
        icon: "brain",
      },
      {
        title: "Time-Saving",
        description: "Quickly clean up and organize years worth of bookmarks.",
        icon: "clock",
      },
      {
        title: "User-Friendly",
        description: "Simple interface for easy bookmark management.",
        icon: "userCheck",
      },
    ],
  },
  {
    title: "Seamless Integration",
    description:
      "Easily import your bookmarks from major browsers and export your organized collection back to your preferred platform.",
    image: "/_static/illustrations/browser-integration.jpg", // You'll need to add this image
    list: [
      {
        title: "Multi-Browser Support",
        description: "Import from Chrome, Firefox, Safari, and more.",
        icon: "globe",
      },
      {
        title: "Easy Export",
        description: "Export your organized bookmarks back to your browser.",
        icon: "fileExport",
      },
      {
        title: "Cloud Sync",
        description: "Access your bookmarks from any device.",
        icon: "cloudSync",
      },
    ],
  },
];

export const features: FeatureLdg[] = [
  {
    title: "Duplicate Removal",
    description: "Automatically detect and remove duplicate bookmarks to keep your collection clean and efficient.",
    link: "/features/duplicate-removal",
    icon: "trash",
  },
  {
    title: "Dead Link Detection",
    description: "Identify and flag dead or broken links, allowing you to easily remove or update outdated bookmarks.",
    link: "/features/dead-link-detection",
    icon: "linkOff",
  },
  {
    title: "AI-Powered Categorization",
    description: "Our intelligent system categorizes and structures your bookmarks for intuitive navigation and easy access.",
    link: "/features/ai-categorization",
    icon: "brain",
  },
  {
    title: "Easy Import/Export",
    description: "Seamlessly import your bookmarks from major browsers and export your organized collection anytime.",
    link: "/features/import-export",
    icon: "fileImport",
  },
  {
    title: "Custom Categories",
    description: "Create and manage custom categories to tailor the organization to your specific needs and preferences.",
    link: "/features/custom-categories",
    icon: "folderPlus",
  },
  {
    title: "Cloud Sync",
    description: "Access your organized bookmarks from any device with secure cloud synchronization.",
    link: "/features/cloud-sync",
    icon: "cloudSync",
  },
];

export const testimonials: TestimonialType[] = [
  {
    name: "John Doe",
    job: "Digital Marketer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review:
      "This bookmark organizer has been a game-changer for me. I used to have thousands of unorganized bookmarks, but now everything is neatly categorized and easily accessible. It's saved me hours of manual organization!",
  },
  {
    name: "Alice Smith",
    job: "Researcher",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "As a researcher, I rely heavily on bookmarks for my work. This tool has made it so much easier to manage my sources and find what I need quickly. The AI categorization is impressively accurate!",
  },
  {
    name: "Michael Chen",
    job: "Software Developer",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    review:
      "I was skeptical at first, but this app really delivered. It cleaned up my messy bookmarks folder and even found dead links I'd forgotten about. The browser integration is seamless - big thumbs up!",
  },
  {
    name: "Emily Johnson",
    job: "Freelance Writer",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    review:
      "I can't believe how much time I've saved with this tool. It organized years of haphazard bookmarking into neat categories. Now I can actually find the articles and resources I need without endless scrolling.",
  },
  {
    name: "David Rodriguez",
    job: "Student",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    review:
      "As a student, I'm always bookmarking research papers and study materials. This app has made my life so much easier. The AI categorization is surprisingly good, and the cloud sync means I can access my bookmarks on any device.",
  },
  {
    name: "Sarah Kim",
    job: "UX Designer",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    review:
      "I love how this tool has streamlined my workflow. The custom categories feature is fantastic for organizing design inspiration. Plus, the interface is clean and intuitive - clearly designed with users in mind!",
  },
  {
    name: "Tom Wilson",
    job: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    review:
      "Running a startup means I'm constantly saving articles and resources. This app has become an essential part of my toolkit. The duplicate removal alone has cleared up so much clutter. Highly recommended for any busy professional!",
  },
  {
    name: "Lisa Patel",
    job: "Teacher",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    review:
      "I use this to organize resources for my classes, and it's been incredible. The dead link detection saves me from embarrassing moments in class, and the easy export feature lets me share curated lists with my students effortlessly.",
  }
];