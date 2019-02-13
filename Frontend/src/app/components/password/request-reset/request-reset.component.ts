import { Component, OnInit } from '@angular/core';
import { UserTableService } from 'src/app/services/user-table.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null
  };

  constructor(
    private UserTable: UserTableService,
    private notify: SnotifyService,
    private Notfiy: SnotifyService
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.UserTable.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error =>  this.notify.error(error.error.error)
    );
  }

  handleResponse(res){
    this.form.email = null;
  }
}
