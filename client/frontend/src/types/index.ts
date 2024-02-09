export type Notes = {
  _id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}[];

export type NoteProps = {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
};