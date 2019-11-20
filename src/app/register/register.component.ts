import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "../_helpers/mush-match.validator.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  showSucMesg = false;
  constructor(private formBuilder: FormBuilder) {}
  usersData: any = new Array();
  messages: any = {
    usersData: "usersData"
  };
  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
    this.checkLocalStorage();
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.createUser(this.registerForm.value);
  }

  public createUser(data: any) {
    this.usersData.push(data);
    this.setLocalStorage(this.usersData);
    this.showSucMesg = true;
    this.registerForm.reset();
    this.ngOnInit();
  }

  public checkLocalStorage() {
    if (localStorage.getItem(this.messages.usersData)) {
      this.usersData = JSON.parse(
        localStorage.getItem(this.messages.usersData)
      );
    } else {
      localStorage.setItem(this.messages.usersData, "");
    }
  }

  public setLocalStorage(data) {
    localStorage.setItem(this.messages.usersData, JSON.stringify(data));
  }
}
