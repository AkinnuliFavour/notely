export type Notes = {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}[];

export type NoteProps = {
  category: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
};