export type FaqType = {
  _id: string;
  topic: string;
  markup: string;
  createdAt: string;
  updatedAt: string;
};

export type FaqsType = Array<FaqType>;
