import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;
  
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService
  ) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe( value => this.loggedIn = value );
  }

  logout(event: MouseEvent){
    event.preventDefault();
    // remove token
    this.Token.remove();
    // change auth status
    this.Auth.changeAuthStatus(false);
    // redirect to login
    this.router.navigateByUrl('login');
  }

}
