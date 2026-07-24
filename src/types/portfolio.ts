export interface Profile {
  name: string;
  title: string;
  subTitle: string;
  bio: string;
  shortBio: string;
  avatarUrl: string;
  aboutImageUrl: string;
  location: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  status: string;
  yearsOfExperience: number;
  completedProjects: number;
  happyClients: number;
  satisfactionRate: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  proficiency: number; // 0 to 100
  level: 'Pemula' | 'Menengah' | 'Mahir' | 'Ahli';
  iconName: string;
  years: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  category: 'web' | 'mobile' | 'design' | 'saas';
  categoryLabel: string;
  featured: boolean;
  imageUrl: string;
  gallery: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  challenge: string;
  solution: string;
  client?: string;
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  skillsUsed: string[];
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Internship';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  achievements?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  content: string;
  rating: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
