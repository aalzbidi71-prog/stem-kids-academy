export type Language = "ar" | "en";

export type CoursePathId = "math" | "english" | "programming" | "skills";

export interface CoursePath {
  id: CoursePathId;
  titleAr: string;
  titleEn: string;
  agesAr: string;
  agesEn: string;
  descriptionAr: string;
  descriptionEn: string;
  color: string;
  iconName: string;
  isActive: boolean; // Is active or future horizon (locked)
  modulesAr: string[];
  modulesEn: string[];
  skillsAr: string[];
  skillsEn: string[];
  giraffePose: 1 | 2 | 3 | 4 | 5; // Use mascot pose mapping
  useMainLogo?: boolean; // Display the main reading giraffe logo if true (input_file_1.png)
}

export interface StudentProject {
  id: string;
  titleAr: string;
  titleEn: string;
  creatorAr: string;
  creatorEn: string;
  age: number;
  pathId: CoursePathId;
  descriptionAr: string;
  descriptionEn: string;
  tagsAr: string[];
  tagsEn: string[];
  likes: number;
  codeSnippet?: string;
  iconType: "game" | "ai" | "animation" | "calculator";
}

export interface PricingPlan {
  id: string;
  nameAr: string;
  nameEn: string;
  priceAr: string;
  priceEn: string;
  priceNum: number;
  periodAr: string;
  periodEn: string;
  sessionsAr: string;
  sessionsEn: string;
  featuresAr: string[];
  featuresEn: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  nameAr: string;
  nameEn: string;
  quoteAr: string;
  quoteEn: string;
  roleAr: string;
  roleEn: string;
  childNameAr: string;
  childNameEn: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}
