export interface Issue {
  issueId: number;
  title: string;
  description: string;
  status: string;
  createdDate: Date;
  updatedDate?: Date;
}
