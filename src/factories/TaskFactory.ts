import { Task } from '../models/Task';
import { v4 as uuidv4 } from 'uuid';

export class TaskFactory {
  public static createTask(title: string, description?: string): Task {
    return {
      id: uuidv4(),
      title,
      description,
      createdAt: new Date(),
    };
  }
}