import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  retrunUrl!: string;
  token!: string;

  constructor(private userSerivce: UserServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createLoginForm();
  }


  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }
  get _email() {
    return this.loginForm.get('email')
  }
  get _password() {
    return this.loginForm.get('password')
  }
  // onSubmit(){
  //   this.userSerivce.login(this.loginForm.value).subscribe({
  //     next:(res:any) =>{
  //       this.token = res.accessToken;

  //     }
  //   })
  // }
}


