
export interface LoveNote {
  message: string;
  author: string;
}

export enum AppState {
  INVITING = 'INVITING',
  ACCEPTED = 'ACCEPTED',
}

export interface DateDetails {
  location: string;
  time: string;
  activity: string;
}
