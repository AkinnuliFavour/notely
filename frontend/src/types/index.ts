export type Notes = {
  _id: number;
  userId: number;
  category: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}[];

export type NoteProps = {
  id: number;
  userId: number;
  category: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
};

export type FormData = {
  id: number;
  title: string;
  category: string;
  description: string;
  completed: boolean;
}