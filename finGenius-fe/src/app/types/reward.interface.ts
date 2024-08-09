export interface IReward {
  id: string;
  name: string;
  description: string;
  linkFile: string;
  streak: number;
  createdAt: string;
  updatedAt: string;
}

export interface IRewardCreate {
  name: string;
  description: string;
  linkFile: string;
  streak: number;
}
