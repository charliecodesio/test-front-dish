import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Task, TaskService } from '../../services/task.service';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../../components/header/header'; 

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, Header],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  providers: [TaskService]
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  errorMessage = '';
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  showCompletedOnly = false;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  toggleComplete(task: Task, event: Event): void {
    const input = event.target as HTMLInputElement;
    const updatedTask = { ...task, completed: input.checked };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        task.completed = updatedTask.completed;
        this.completedTasks = this.tasks.filter(t => t.completed).length;
        this.pendingTasks = this.tasks.filter(t => !t.completed).length;
      },
      error: () => {
        this.errorMessage = 'Error updating task';
      }
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.totalTasks--;
        this.completedTasks = this.tasks.filter(t => t.completed).length;
        this.pendingTasks = this.tasks.filter(t => !t.completed).length;
      },
      error: () => {
        this.errorMessage = 'Error deleting task';
      }
    });
  }

  goToEdit(id: number): void {
    this.router.navigate(['/tasks/edit', id]);
  }


  ngOnInit() {
    this.loadTasks();
  }

  toggleFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.showCompletedOnly = input.checked;
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = this.showCompletedOnly
          ? data.filter(t => t.completed)
          : data;

        this.totalTasks = this.tasks.length;
        this.completedTasks = this.tasks.filter(t => t.completed).length;
        this.pendingTasks = this.tasks.filter(t => !t.completed).length;
      },
      error: () => {
        this.errorMessage = 'Error fetching tasks';
      }
    });
  }


}
