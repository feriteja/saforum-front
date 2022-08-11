export interface UserType {
  username: string;
  role: "superadmin" | "admin" | "user";
  avatar?: string | File;
  status?: string;
  alias?: string;
  uuid: string;
  created_at?: Date;
  state?: "banned" | "free";
}

export interface ChatType {
  createdtime: number;
  message: string;
  room: string;
  username: string;
}

export interface AuthTokenType {
  access_token: string;
  refresh_token: string;
}

export interface ForumType {
  fuid?: string;
  title?: string;
  banner?: string;
  owner?: { username: string; uuid: string };
  created_at?: Date;
  content?: string;
  comment?: number;
  view_count?: number;
  category: string;
  like_by: string[];
}
export interface detailForumType extends Omit<ForumType, "comment"> {
  comment?: CommentType[];
}

export interface CommentType {
  id?: string;
  user?: string;
  username?: string;
  avatar?: null;
  alias?: null;
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

export interface AppLogType {
  logID: string;
  activity?: string;
  status?: "success" | "failed";
  time?: Date;
  role?: "user" | "admin" | "superadmin";
  username?: string;
  target?: string;
  detail?: string;
}
