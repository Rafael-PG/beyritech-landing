export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  area: string;
  features: string[];
  description: string;
  slug: string;
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
