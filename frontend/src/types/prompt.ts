import { Category, Tag } from './categoryTag';
import { User } from './auth';

export interface Prompt {
  id: number;
  title: string;
  description?: string;
  promptText: string;
  systemInstruction?: string;
  targetModel: string;
  
  // AI Tool & External Chat Location Properties
  aiTool: string;
  externalChatUrl?: string;
  externalChatId?: string;
  chatSummary?: string;

  isPublic: boolean;
  isFavorite: boolean;
  viewCount: number;
  likeCount: number;
  category: Category;
  tags: Tag[];
  author: User;
  extractedVariables: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface PromptRequest {
  title: string;
  description?: string;
  promptText: string;
  systemInstruction?: string;
  targetModel: string;
  
  aiTool?: string;
  externalChatUrl?: string;
  externalChatId?: string;
  chatSummary?: string;

  categoryId: number;
  tagIds?: number[];
  isPublic?: boolean;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
