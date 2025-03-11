export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export const transactionTypeLocales: Record<TransactionType, string> = {
  [TransactionType.INCOME]: "Доход",
  [TransactionType.EXPENSE]: "Расход",
};


export const transactionTypes: TransactionType[] = Object.values(TransactionType) as TransactionType[];

export const transactionTypesSelect: { value: TransactionType; name: string }[] =
  transactionTypes.map((el) => ({
    value: el,
    name: transactionTypeLocales[el],
  }));

export interface Transaction {
  id: number
  date: string
  type: TransactionType
  amount: number
  description: string
}

export type Transactions = Transaction[]
