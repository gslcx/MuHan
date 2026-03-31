export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
}

export interface WorkspaceItem {
  id: string;
  category: string;
  name: string;
  description: string;
  image?: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
}
