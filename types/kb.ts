// types/kb.ts

export interface KBData {
  orgName: string;
  kbId: string;
  articles: Article[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Article {
  id: string;
  title: string;
  content?: string;
  category?: string;
  url?: string;
}

export interface KBApiResponse {
  success: boolean;
  data?: KBData;
  error?: string;
}