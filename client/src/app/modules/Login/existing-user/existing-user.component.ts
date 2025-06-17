import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/userService';
import { User } from '../../../domain/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  
  constructor(private _userService: UserService, private router: Router) { }
  submitted: boolean = false
  //users: User[] | undefined
  ngOnInit(): void {
    this.existingUser=false
    this.formLogin= new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    // this.userService.getUsersDataFromServer().subscribe(data => {
    //   this.users = data;
    // },
      // (err) => {
      //   console.log(`faild on get users from data ${err}`)
      // })

  }
  // existingPassword(password: string) {

  //   if (this.users?.find((user) => user.password == password))
  //     return true
  //   return false
  // }
  entry() {
    this.submitted = true
    this._userService.login(this.formLogin.controls['username'].value, this.formLogin.controls['password'].value).subscribe(
      (data) => {
        this.existingUser = true
        console.log(`login success ${data}`)
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', this.formLogin.controls['username'].value)
        this._userService.token = data.token;
        this.router.navigate(['/gifts']);


      },
      (err) => {
        this.existingUser = false
        console.log(`login failed ${err}`)
      }
    )
  }
}
