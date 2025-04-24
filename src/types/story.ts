export interface Story {
  id: number;
  title: string;
  description?: string;
  author?: string;
  documentId: string;
  createdAt: string;
  content: string; // contains embedded <img> tag(s)
}
