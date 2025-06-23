import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/userService';
import { User } from '../../../domain/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
@Component({
  selector: 'app-existing-user',
  standalone: false,
  
  templateUrl: './existing-user.component.html',
  styleUrl: './existing-user.component.css'
})
export class ExistingUserComponent implements OnInit {
  existingUser: boolean = false;
  message:string="User does not exist yet Check the username and password you entered or register by clicking on sign up"
  formLogin: FormGroup=new FormGroup({})

  
  constructor(private _userService: UserService, private router: Router, private authService: AuthService) { }
  submitted: boolean = false
  showMessage: boolean = false;
  ngOnInit(): void {
    this.existingUser=false
    this.formLogin= new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

  }
  entry() {
    this.submitted = true
    this._userService.login(this.formLogin.controls['username'].value, this.formLogin.controls['password'].value).subscribe(
      (data) => {
        this.existingUser = true
        console.log(`login success ${data}`)
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', this.formLogin.controls['username'].value)
        const userRole = data.role; 
        this.authService.setUserRole(userRole);
        this._userService.token = data.token;
        this.router.navigate(['/gifts']);
      },
      (err) => {
        this.existingUser = false
        console.log(`login failed ${err}`)
        this.showMessage = true;
      }
    )
  }
}
