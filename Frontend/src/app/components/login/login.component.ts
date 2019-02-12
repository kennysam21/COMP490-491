import { Component, OnInit } from '@angular/core';
import { UserTableService } from 'src/app/services/user-table.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(private UserTable: UserTableService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.UserTable.login(this.form).subscribe(
      data => console.log(data),
      error => this.handleError(error)
    );
  }

  handleError(error){
    this.error = error.error.error;
  }

}
