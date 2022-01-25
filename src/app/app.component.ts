import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formGroup = this.fb.group({
      acc: [
        'enter account',
        [Validators.required, Validators.pattern(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/gi)],
      ],
      pwd: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }

  getControl(name: 'acc' | 'pwd'): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  getErrorMsg(control: FormControl) {
    let msg = '';
    if (!control.errors || control.pristine) {
      msg = '';
    } else if (control.errors['required']) {
      msg = 'this is required!';
    } else if (control.errors['pattern']) {
      msg = 'pattern error!';
    } else if (control.errors['minlength']) {
      msg = 'minlenth 8!';
    } else if (control.errors['maxlength']) {
      msg = 'maxlength 16!';
    }
    return msg;
  }

  log(...param: any[]) {
    console.log(...param);
  }
}
