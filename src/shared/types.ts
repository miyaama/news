export interface NewsItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface CommentType {
  id: number;
  author: string;
  content: string;
  deleted: boolean;
  datetime: number;
  avatar: string;
  subs: CommentType[];
}
