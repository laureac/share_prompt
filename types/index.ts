import { FormEvent } from "react";

export interface UserProps {
  email: string;
  username: string;
  image: string;
  _id: number;
}

export interface PostProps {
  prompt: string;
  tag: string;
  creator: UserProps;
  _id: number;
}

export interface FormProps {
  type: string;
  post: {
    prompt: string;
    tag: string;
  };
  setPost: (post: { prompt: string; tag: string }) => void;
  submitting: any;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export interface PromptCardProps {
  post: PostProps;
  handleTagClick?: (tagName: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

export interface PromptCardListProps {
  data: Array<PostProps>;
  handleTagClick: (tagName: string) => void;
}

export interface ProfileProps {
  name: string;
  desc: string;
  data: Array<PostProps>;
  handleEdit?: (post: PostProps) => void;
  handleDelete?: (post: PostProps) => void;
}
