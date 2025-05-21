import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/userService';
import { User } from '../../../domain/user';


@Component({
  selector: 'app-new-user',
  standalone: false,

  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  user: User = {
    password: ''
  }
  formUser: User = {
    password: ''
  }
  submited: boolean = false
  existingUser: boolean = false
  // users: User[] | undefined
  constructor(private _userService: UserService) {
    //   this._userService.getUsersDataFromServer().subscribe(data => {
    //     this.users = data
    //   }, err => {
    //     console.log(`error in get users from server: ${err}`)
    //   })
  }
  registerForm: FormGroup = new FormGroup({
    "fullname": new FormControl("", Validators.required),
    "username": new FormControl("", Validators.required),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "phone": new FormControl("", [Validators.minLength(9), Validators.maxLength(11)]),
    "password": new FormControl("", [Validators.required, Validators.minLength(8)])
  });

  onRegister() {
    this.submited = true
    this._userService.usernameExist(this.registerForm.controls['username'].value).subscribe(exist => {
      if (exist) {
        this.existingUser = true
        console.log(`user name already exist`)
      }
      else {
        this.existingUser = false
        this.formUser = this.registerForm.value
        this.formUser.giftList = []
        console.log('Payload being sent to the server:', this.formUser);
        this.user = this.formUser

        this._userService.post(this.user).subscribe(data => {
          console.log(`add user successful`, this.user)
        },
          err => {
            console.log(`error to add user ${err}`)
          })
      
      }
    });

  }
}
