import { Injectable } from '@nestjs/common';
import { TaskDTO } from 'src/DTO/taskDTO';
import { Task } from 'src/models/task';

@Injectable()
export class TasksService {
  allTasks: Task[] = [];

  getTasks(st) {
    return this.allTasks.filter((t) => t.statut.includes(st));
  }

  getTaskById(id) {
    return this.allTasks.find((t) => t.id == id);
  }

  addTask(newTask) {
    let newId;
    if (this.allTasks.length)
      newId = this.allTasks[this.allTasks.length - 1].id + 1;
    else newId = 0;

    this.allTasks.push({
      id: newId,
      title: newTask.title,
      description: newTask.description,
      statut: newTask.statut,
      createdAt: new Date(),
    });
  }

  updateTask(uTask) {}

  deleteTask(dTask) {}
}
