import { Component, Output, EventEmitter } from '@angular/core';
import { Task, Status, Priority } from '../todo-list/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  statuses = Object.values(Status);
  priorities = Object.values(Priority);
  newTask: Partial<Task> = {};

  addTask() {
    if (this.newTask.name && this.newTask.status && this.newTask.priority) {
      const task = new Task(
        Date.now(),  // Using timestamp as a unique ID
        this.newTask.name,
        this.newTask.status as Status,
        this.newTask.priority as Priority,
        this.newTask.dueDate ? new Date(this.newTask.dueDate) : undefined
      );
      this.taskAdded.emit(task);
      this.newTask = {};
    }
  }
}
