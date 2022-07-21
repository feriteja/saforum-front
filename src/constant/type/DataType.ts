export interface UserType {
  username: string;
  role: "SUPERADMIN" | "USER";
  avatar?: string;
  status?: string;
  forumown?: string[];
  alias?: string;
}
