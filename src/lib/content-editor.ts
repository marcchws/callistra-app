export interface TestimonialsContent {
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar?: string;
    rating: number;
  }>;
}

export interface StatsContent {
  stats: Array<{
    id: string;
    number: number;
    label: string;
    description?: string;
    suffix?: string;
  }>;
}

export interface ContactMethodsContent {
  contactMethods: Array<{
    id: string;
    type: string;
    value: string;
    label: string;
    icon: string;
    title: string;
    action: string;
  }>;
}

export interface ImageContent {
  src: string;
  alt?: string;
  deleted?: boolean;
}

export interface PlanContent {
  plans: Array<unknown>;
}

export interface EditableContent {
  id: string;
  content: unknown;
  section: string;
  type: 'text' | 'rich-text' | 'image' | 'plan' | 'testimonial' | 'stat' | 'contact-method';
  lastModified: Date;
  modifiedBy: string;
}

export interface ContentHistory {
  id: string;
  contentId: string;
  content: unknown;
  section: string;
  type: EditableContent['type'];
  timestamp: Date;
  modifiedBy: string;
  action: 'create' | 'update' | 'delete';
  newContent?: unknown;
  previousContent?: unknown;
  userId?: string;
}
