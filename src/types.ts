export interface Project {
  id: string;
  title: string;
  category: "Mining" | "Corporate" | "Healthcare" | "Education" | "Industrial";
  location: string;
  area: string;
  features: string[];
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface EstimateRequest {
  industry: string;
  moduleType: string;
  area: string;
  capacity: string;
  location: string;
  sustainability: boolean;
  insulation: boolean;
  timeline: string;
  additionalSpecs: string;
}

export interface EstimateResponse {
  projectCode: string;
  executiveSummary: string;
  recommendedLayout: string;
  technicalSpecs: Array<{
    category: string;
    detail: string;
  }>;
  timelineEstimate: {
    manufacturing: string;
    logistics: string;
    assembly: string;
    totalWeeks: number;
  };
  sustainabilityScore: string;
  _warning?: string;
}
