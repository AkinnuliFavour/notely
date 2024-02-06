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
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setEditOpened: React.Dispatch<React.SetStateAction<boolean>>;
};