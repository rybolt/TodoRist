import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Task, Status, Priority } from './task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [CommonModule, FormsModule, TaskFormComponent]
})
export class TodoListComponent implements OnInit, AfterViewInit {
  tasks: Task[] = [];
  showTaskForm = false;
  selectedTask: Task | null = null;
  statuses = Object.values(Status);
  priorities = Object.values(Priority);
  filterStatus: string = '';
  filterPriority: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('todo-email'))
      this.loadTasks();
    else
      this.router.navigate(['/login']);
  }

  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  loadTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
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

  toggleTaskForm() {
    this.selectedTask = null;
    this.showTaskForm = !this.showTaskForm;    
  }

  logOut() {
    localStorage.setItem('todo-email', '');
    this.router.navigate(['/']);
  }

  onTaskSaved(task: Task) {
    const existingTaskIndex = this.tasks.findIndex(t => t.id === task.id);
    if (existingTaskIndex !== -1) {
      this.tasks[existingTaskIndex] = task;
    } else {
      task.id = Date.now(); // Use current timestamp as unique ID for new tasks
      this.tasks.push(task);
    }
    this.saveTasks();
    this.showTaskForm = false;
  }

  onFormCancelled() {
    this.showTaskForm = false;
  }

  toggleTaskStatus(task: Task) {
    task.status = task.status === Status.Completed ? Status.InProgress : Status.Completed;
    this.saveTasks();
  }

  editTask(task: Task) {
    this.selectedTask = { ...task };
    this.showTaskForm = true;
  }

  deleteTask(taskId: number) {
    const confirmation = window.confirm('Are you sure you want to delete this task?');
    if (confirmation) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.saveTasks();
    }
  }

  getPriorityClass(priority: Priority): string {
    switch (priority) {
      case Priority.High:
        return 'priority-high';
      case Priority.Medium:
        return 'priority-medium';
      case Priority.Low:
        return 'priority-low';
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
    return this.tasks
      .filter(task =>
        (this.filterStatus ? task.status === this.filterStatus : true) &&
        (this.filterPriority ? task.priority === this.filterPriority : true)
      )
      .sort((a, b) => {
        // If both tasks have due dates, sort by due date
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        // If only one task has a due date, it comes first
        if (a.dueDate && !b.dueDate) return -1;
        if (!a.dueDate && b.dueDate) return 1;
        // If neither task has a due date, sort by priority
        if (a.priority !== b.priority) {
          return this.comparePriority(a.priority, b.priority);
        }
        return 0;
      });
  }
  
  comparePriority(a: Priority, b: Priority): number {
    const priorityOrder = [Priority.High, Priority.Medium, Priority.Low];
    return priorityOrder.indexOf(a) - priorityOrder.indexOf(b);
  }
  
}
