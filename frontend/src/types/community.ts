import { User } from './auth';

export interface RatingSummary {
  averageRating: number;
  totalRatings: number;
  userRating?: number;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  createdAt: string;
}

export interface CommentRequest {
  content: string;
}

export interface RatingRequest {
  stars: number;
}
