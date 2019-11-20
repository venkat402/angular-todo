import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  tasks: any = new Array();
  showSucMsg = false;
  editTaskDetails: any;
  messages: any = {
    tasks: "tasks",
    added: "added",
    deleteMsg: "are you sure you want to delete",
    completed: "completed"
  };
  enterTaskName: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      taskName: ["", Validators.required]
    });
    this.setUpBootLocalStorage();
    this.getCurrentTasks();
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    if (this.editTaskDetails) {
      this.updateTask(this.registerForm.value.taskName);
      return;
    }
    if (this.registerForm.value.taskName) {
      this.saveTask(this.registerForm.value.taskName);
    }
  }
  public updateTask(data) {
    this.tasks[this.editTaskDetails.id].taskName = this.tasks[
      this.editTaskDetails.id
    ].taskName = data;
    this.setTasksToLocalStorage(this.tasks);
    this.showSucMsg = true;
  }
  public saveTask(data: any) {
    this.getCurrentTasks();
    let add_task: any = { taskName: data, taskStatus: this.messages.added };
    this.tasks.push(add_task);
    localStorage.setItem(this.messages.tasks, JSON.stringify(this.tasks));
    this.ngOnInit();
    this.showSucMsg = true;
    this.registerForm.reset();
    this.registerForm.markAsUntouched();
  }

  static resetForm(formGroup: FormGroup) {
    formGroup.reset();
    formGroup.markAsUntouched();
  }

  public getCurrentTasks() {
    if (localStorage.getItem(this.messages.tasks)) {
      this.tasks = JSON.parse(localStorage.getItem(this.messages.tasks));
    }
  }

  public setUpBootLocalStorage() {
    if (!localStorage.getItem(this.messages.tasks)) {
      localStorage.setItem(this.messages.tasks, "");
    }
  }

  public deleteAllTasks() {
    if (confirm(this.messages.deleteMsg)) {
      localStorage.setItem(this.messages.tasks, "");
    }
  }

  public markAsCompleted(i) {
    this.tasks[i].taskStatus = this.messages.completed;
    this.setTasksToLocalStorage(this.tasks);
  }
  public markAsInComplete(i) {
    this.tasks[i].taskStatus = this.messages.added;
    this.setTasksToLocalStorage(this.tasks);
  }

  public deleteTask(i) {
    this.tasks[i] = undefined;
    this.tasks = this.tasks.filter(item => item);
    this.setTasksToLocalStorage(this.tasks);
    this.showSucMsg = true;
  }

  public setTasksToLocalStorage(data) {
    localStorage.setItem(this.messages.tasks, JSON.stringify(data));
    this.ngOnInit();
  }
  public editTask(i) {
    this.enterTaskName = this.tasks[i].taskName;
    this.editTaskDetails = { id: i, details: this.tasks[i] };
  }
}
