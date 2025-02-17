import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task, Status, Priority } from '../todo-list/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() task: Task | null = null;
  @Output() taskSaved = new EventEmitter<Task>();
  @Output() formCancelled = new EventEmitter<void>();
  taskForm: FormGroup;
  statuses = Object.values(Status);
  priorities = Object.values(Priority);

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['']
    });
  }

  ngOnInit() {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskSaved.emit(this.taskForm.value);
      this.taskForm.reset();
    }
  }

  onCancel() {
    this.taskForm.reset();
    this.formCancelled.emit();
  }
}
