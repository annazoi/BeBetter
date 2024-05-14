export interface NewFeature {
  name: string;
  description?: string;
}
export interface Feature {
  name: string;
  description?: string;
  percent?: string;
  id: string;
  [key: string]: any;
}
