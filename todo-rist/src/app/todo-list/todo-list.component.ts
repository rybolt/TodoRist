import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Task, Status, Priority } from './task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from '../add-task/add-task.component';
declare var $: any;

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [CommonModule, FormsModule, AddTaskComponent]
})
export class TodoListComponent implements OnInit, AfterViewInit {
  tasks: Task[] = [];
  statuses = Object.values(Status);
  priorities = Object.values(Priority);
  showAddTaskForm = false;
  filterStatus: string = '';
  filterPriority: string = '';

  ngOnInit() {
    this.loadTasks();
  }

  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  loadTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
    else{
      this.tasks = [
        new Task(1, 'Do taxes', Status.Completed, Priority.High, new Date('2025-02-20')),
        new Task(2, 'Walk the poodle mix', Status.InProgress, Priority.Medium),
        new Task(3, 'Weed the yard', Status.NotStarted, Priority.Low, new Date('2025-02-25')),
        new Task(4, 'Do homework', Status.Completed, Priority.High, new Date('2025-02-20')),
        new Task(5, 'Walk the poodle mix again', Status.InProgress, Priority.Medium),
        new Task(6, 'Mow the yard', Status.NotStarted, Priority.Low, new Date('2025-02-25')),
        new Task(7, 'Do a quick house cleaning', Status.Completed, Priority.High, new Date('2025-02-20')),
        new Task(8, 'Walk the poodle mix, yet AGAIN', Status.InProgress, Priority.Medium),
        new Task(9, 'Fertilize the yard', Status.NotStarted, Priority.Low, new Date('2025-02-25'))
     
      ];
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  toggleAddTaskForm() {
    this.showAddTaskForm = !this.showAddTaskForm;
  }

  onTaskAdded(task: Task) {
    this.tasks.push(task);
    this.saveTasks();
    this.showAddTaskForm = false;
  }

  toggleTaskStatus(task: Task) {
    task.status = task.status === Status.Completed ? Status.InProgress : Status.Completed;
    this.saveTasks();
  }

  editTask(task: Task) {
    const editedTask = prompt('Edit task name:', task.name);
    if (editedTask !== null) {
      task.name = editedTask;
      this.saveTasks();
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  getPriorityClass(priority: Priority): string {
    switch (priority) {
      case Priority.High:
        return 'text-danger';
      case Priority.Medium:
        return 'text-warning';
      case Priority.Low:
        return 'text-success';
      default:
        return '';
    }
  }

  getPriorityIcon(priority: Priority): string {
    switch (priority) {
      case Priority.High:
        return 'fas fa-exclamation-circle';
      case Priority.Medium:
        return 'fas fa-exclamation-triangle';
      case Priority.Low:
        return 'fas fa-check-circle';
      default:
        return '';
    }
  }

  filteredTasks(): Task[] {
    return this.tasks.filter(task =>
      (this.filterStatus ? task.status === this.filterStatus : true) &&
      (this.filterPriority ? task.priority === this.filterPriority : true)
    );
  }
}
