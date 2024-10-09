import { Task } from '../models/Task';
import { TaskFactory } from '../factories/TaskFactory';
import { TaskService } from '../services/TaskService';

export class TaskFacade {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  public createTask(title: string, description?: string): Task {
    const task = TaskFactory.createTask(title, description);
    return this.taskService.addTask(task);
  }

  public getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  public getTaskById(id: string): Task | undefined {
    return this.taskService.getTaskById(id);
  }

  public updateTask(id: string, updatedFields: Partial<Task>): Task | undefined {
    return this.taskService.updateTask(id, updatedFields);
  }

  public deleteTask(id: string): boolean {
    return this.taskService.deleteTask(id);
  }
}
