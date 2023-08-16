export type TaskT = {
  _id: string;
  title: string;
  body: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TaskUpdateDataT = {
  _id: string;
  completed?: boolean;
  title?: string;
  body?: string;
};
