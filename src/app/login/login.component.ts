import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "../_helpers/mush-match.validator.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  usersData: any;
  messages: any = {
    usersData: "usersData",
    home: "/home"
  };
  sucMsg = false;
  failMsg = false;
  isUserLogin: any;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
    this.getDataFromLocal();
    this.checkLoginLocal();
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.Login(this.registerForm.value.email, this.registerForm.value.password);
  }

  public Login(data_email, data_password) {
    var target = this.usersData.find(temp => temp.email == data_email);
    if (target) {
      if (target.password == data_password) {
        this.registerForm.reset();
        this.sucMsg = true;
        this.localStoreLogin(target);
        this.router.navigate([this.messages.home]);
      } else {
        this.registerForm.reset();
        this.failMsg = true;
      }
    } else {
      this.registerForm.reset();
      this.failMsg = true;
    }
    this.ngOnInit();
  }

  public getDataFromLocal() {
    if (localStorage.getItem(this.messages.usersData)) {
      this.usersData = JSON.parse(
        localStorage.getItem(this.messages.usersData)
      );
    }
  }

  public localStoreLogin(data) {
    localStorage.setItem("user_login", JSON.stringify(data));
  }

  public checkLoginLocal() {
    if (localStorage.getItem("user_login")) {
      this.isUserLogin = localStorage.getItem("user_login");
    }
  }
}
