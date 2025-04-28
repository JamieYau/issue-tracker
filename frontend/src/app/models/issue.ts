export interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  createdDate: Date;
  updatedDate?: Date;
}
