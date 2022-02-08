import { Component, ViewChild } from '@angular/core';
import { NgModel, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  account = '123';
  pwd = 'abc';
  accountErrorMsg = '';
  pwdErrorMsg = '';

  @ViewChild('accModel') accNgModelRef!: NgModel;

  ngOnInit(): void {
    // console.trace('AppComponent Init');
    console.count('AppComponent Init');
  }

  accountValueChange(acc: string, error: ValidationErrors | null) {
    this.account = acc;
    this.runValid(error, 'account');
  }

  pwdValueChange(pwd: string, error: ValidationErrors | null) {
    this.pwd = pwd;
    this.runValid(error, 'pwd');
  }

  private runValid(error: ValidationErrors | null, controlName: 'account' | 'pwd') {
    let msg = '';
    if (!error) {
      msg = '';
    } else if (error['required']) {
      msg = 'this is required!';
    } else if (error['pattern']) {
      msg = 'pattern error!';
    } else if (error['minlength']) {
      msg = 'minlength 8!';
    } else {
      msg = 'unknown error!';
    }
    this.setErrorMsg(controlName, msg);
  }

  private setErrorMsg(controlName: 'account' | 'pwd', errorMsg: string) {
    if (controlName === 'account') {
      this.accountErrorMsg = errorMsg;
    } else {
      this.pwdErrorMsg = errorMsg;
    }
  }

  log(...param: any[]) {
    console.log(...param);
  }
}
