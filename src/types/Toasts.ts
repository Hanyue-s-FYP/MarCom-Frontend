export enum ToastType {
  WARNING,
  OK,
  ERROR,
}

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}
