export type CouponResponseDTO = {
  id: string;
  code: string;
  discount: number;
  expiredDate: string;
  userId: string;
  isUsed: boolean;
}