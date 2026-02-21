export type ReferralRewardDTO = {
  id: string;
  points: number;
  reason: string;
  startDate: string;
  expireDate: string;
}

export type ReferralInfoResponseDTO = {
  availablePoints: number;
  history: ReferralRewardDTO[];
}