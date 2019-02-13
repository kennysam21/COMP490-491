import { Component, OnInit } from '@angular/core';
import { UserTableService } from 'src/app/services/user-table.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private UserTable: UserTableService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.UserTable.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error){
    this.error = error.error.error;
  }

  handleResponse(data){
    this.Token.handle(data.access_token);
    // changes global auth status
    this.Auth.changeAuthStatus(true);
    // opens dashboard when returns true
    this.router.navigateByUrl('dashboard');
  }

}
