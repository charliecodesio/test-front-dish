import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
  providers: [TaskService]
})
export class TaskForm implements OnInit {
  title = '';
  description = '';
  completed = false;
  errorMessage = '';
  isEditMode = false;
  taskId: string | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.taskId;

    if (this.isEditMode && this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (task) => {
          this.title = task.title;
          this.description = task.description;
          this.completed = task.completed;
        },
        error: () => {
          this.errorMessage = 'Error loading task';
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.title.trim() || !this.description.trim()) {
      this.errorMessage = 'Title and description are required';
      return;
    }

    const taskData = {
      id: Number(this.taskId),
      title: this.title,
      description: this.description,
      completed: this.completed,
    };


    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(Number(this.taskId), taskData).subscribe({

        next: () => this.router.navigate(['/tasks']),
        error: () => this.errorMessage = 'Error updating task'
      });
    } else {
      this.taskService.createTask({ ...taskData, completed: false }).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: () => this.errorMessage = 'Error creating task'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}
