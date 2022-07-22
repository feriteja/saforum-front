export interface UserType {
  username: string;
  role: "SUPERADMIN" | "USER";
  avatar?: string;
  status?: string;
  forumown?: string[];
  alias?: string;
  uuid: string;
  created_at?: Date;
}

export interface AuthTokenType {
  access_token: string;
  refresh_token: string;
}

export interface ForumType {
  fuid?: string;
  title: string;
  owner: string;
  created_at?: Date;
  content?: string;
  comment?: number;
  view_count?: number;
  like_count?: number;
  category: string;
}
export interface detailForumType extends Omit<ForumType, "comment"> {
  comment?: CommentType[];
}

export interface CommentType {
  user?: string;
  comment: string;
  created_at?: Date;
}

export enum categoryType {
  public = "PUBLIC",
  story = "STORY",
  hobby = "HOBBY",
  games = "GAMES",
  entertainment = "ENTERTAINMENT",
  female = "FEMALE",
  tech = "TECH",
  automotive = "AUTOMOTIVE",
  sports = "SPORTS",
  news = "NEWS",
}
