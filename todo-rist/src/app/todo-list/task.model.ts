  export enum Status {
    Completed = 'completed',
    InProgress = 'in-progress',
    NotStarted = 'not started'
  }
  
  export enum Priority {
    High = 'high',
    Medium = 'medium',
    Low = 'low'
  }
  
  export class Task {
    id: number;
    name: string;
    status: Status;
    dueDate?: Date;
    priority: Priority;
  
    constructor(id: number, name: string, status: Status, priority: Priority, dueDate?: Date) {
      this.id = id;
      this.name = name;
      this.status = status;
      this.priority = priority;
      this.dueDate = dueDate;
    }
  }
  