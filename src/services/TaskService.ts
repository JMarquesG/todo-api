import { Task } from '../models/Task';

export class TaskService {
  private tasks: Task[] = [];

  public addTask(task: Task): Task {
    this.tasks.push(task);
    return task;
  }

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  public updateTask(id: string, updatedFields: Partial<Task>): Task | undefined {
    const task = this.getTaskById(id);
    if (task) {
      Object.assign(task, updatedFields);
    }
    return task;
  }

  public deleteTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    return this.tasks.length < initialLength;
  }
}
