export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  colorCode: string;
  createdAt: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
}

export interface CategoryRequest {
  name: string;
  description?: string;
  colorCode?: string;
}

export interface TagRequest {
  name: string;
}
