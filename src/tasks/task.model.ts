


export interface ITask {
  id: string,
  title: string,
  description: string,
  status: TaskStatus
}

export enum TaskStatus {
  Open = "Open",
  InProgress = "InProgress",
  Done = "Done"
}