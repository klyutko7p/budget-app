interface Operation {
  account: Account;
  id: number;
  amount: number;
  category: Category;
  date: Date;
  commentary: string | null;
  type: string;
}
