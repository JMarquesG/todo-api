import { Request, Response } from 'express';
import { TaskFacade } from '../facades/TaskFacade';

export class TaskController {
  private taskFacade: TaskFacade;

  constructor() {
    this.taskFacade = new TaskFacade();
  }

  public createTask = (req: Request, res: Response): void => {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      res.status(400).json({ message: 'Title is required.' });
      return;
    }

    const task = this.taskFacade.createTask(title, description);
    res.status(201).json(task);
  };

  public getAllTasks = (req: Request, res: Response): void => {
    const tasks = this.taskFacade.getAllTasks();
    res.status(200).json(tasks);
  };

  public getTaskById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const task = this.taskFacade.getTaskById(id);

    if (!task) {
      res.status(404).json({ message: 'Task not found.' });
      return;
    }

    res.status(200).json(task);
  };

  public updateTask = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (title !== undefined && title.trim() === '') {
      res.status(400).json({ message: 'Title cannot be empty.' });
      return;
    }

    const updatedTask = this.taskFacade.updateTask(id, { title, description });

    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found.' });
      return;
    }

    res.status(200).json(updatedTask);
  };

  public deleteTask = (req: Request, res: Response): void => {
    const { id } = req.params;
    const success = this.taskFacade.deleteTask(id);

    if (!success) {
      res.status(404).json({ message: 'Task not found.' });
      return;
    }

    res.status(200).json({ message: 'Task deleted successfully.' });
  };
}
