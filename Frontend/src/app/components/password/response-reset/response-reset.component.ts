import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserTableService } from 'src/app/services/user-table.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  public error = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }
  constructor(
    private route: ActivatedRoute,
    private UserTable: UserTableService
  ) 
  { 
    // get token from url and add to form
    route.queryParams.subscribe(params =>{
      this.form.resetToken = params['token']
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.UserTable.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data){

  }

  handleError(error){

  }

}
