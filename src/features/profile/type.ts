export type Profile = {
  id: string;
  username: string;
  email: string;
  role: "customer" | "organizer";
  referralCode: string;
  avatarUrl: string | null;
  createdAt: string;
};