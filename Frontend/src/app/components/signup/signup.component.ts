import { Component, OnInit } from '@angular/core';
import { UserTableService } from 'src/app/services/user-table.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form ={
    email: null,
    name: null,
    pass: null,
    password_confirmation: null
  };

  public error = null;

  constructor(private UserTable: UserTableService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.UserTable.signup(this.form).subscribe(
      data => console.log(data),
      error => this.handleError(error)
    );
  }

  handleError(error){
    this.error = error.error.error;
  }
}
