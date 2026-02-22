export type RegisterDTO = {
  email: string;
  username: string;
  password: string;
  role: "customer" | "organizer";
  referralCode?: string;
};
