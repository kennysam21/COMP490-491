import { Component, OnInit } from '@angular/core';
import { UserTableService } from 'src/app/services/user-table.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

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

  constructor(
    private UserTable: UserTableService, 
    private Token: TokenService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.UserTable.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error){
    this.error = error.error.error;
  }
  
  handleResponse(data){
    // this.Token.handle(data.access_token);
    // opens dashboard when returns true
    this.router.navigateByUrl('login');
  }
}
