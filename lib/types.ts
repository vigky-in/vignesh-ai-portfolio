export type ProjectT = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string | null;
  techStack: string;
  githubUrl: string | null;
  liveUrl: string | null;
  mlModel: string | null;
  accuracy: string | null;
  featured: boolean;
  order: number;
};

export type JourneyItemT = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string | null;
  tags: string;
  order: number;
};

export type SkillT = {
  id: string;
  name: string;
  category: string;
  level: number;
  order: number;
};

export type TestimonialT = {
  id: string;
  name: string;
  role: string;
  company: string | null;
  photo: string | null;
  review: string;
  rating: number;
  order: number;
};

export type FaqItemT = {
  id: string;
  question: string;
  answer: string;
  order: number;
};
