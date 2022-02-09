import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  describe('Unit Testing :', () => {
    describe('Error Message', () => {
      it('should get empty string when value is correct', () => {
        const control = new FormControl('');
        const errorMsg = '';

        expect(app.getErrorMsg(control)).toBe(errorMsg);
      });

      it('should get empty string when value is empty string and status pristine is true', () => {
        const control = new FormControl('');
        const errorMsg = '';

        control.markAsPristine();

        expect(app.getErrorMsg(control)).toBe(errorMsg);
      });

      it('should get "this is required!" when value is empty string and control is touched', () => {
        const control = new FormControl('', [Validators.required]);
        const errorMsg = 'this is required!';

        control.markAsDirty();

        expect(app.getErrorMsg(control)).toBe(errorMsg);
      });

      it('should get "pattern error!" when value is invalid string and control is touched', () => {
        const control = new FormControl('userInput', [
          Validators.pattern(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/gi),
        ]);
        const errorMsg = 'pattern error!';

        control.markAsDirty();

        expect(app.getErrorMsg(control)).toBe(errorMsg);
      });

      it('should get "minlenth 8!" when value is shorter than 8', () => {
        const control = new FormControl('123', [Validators.minLength(8)]);
        const errorMsg = 'minlenth 8!';

        control.markAsDirty();

        expect(app.getErrorMsg(control)).toBe(errorMsg);
      });

      it('should get "maxlength 16!" when value is longer than 16', () => {
        const control = new FormControl('123456789123456789', [Validators.maxLength(16)]);
        const errorMsg = 'maxlength 16!';

        control.markAsDirty();

        expect(app.getErrorMsg(control)).toBe(errorMsg);
      });
    });

    describe('FormGroup', () => {
      it('should be undefined before ngOninit', () => {
        expect(app.formGroup).toBeFalsy();
      });

      describe('after ngOnInit', () => {
        beforeEach(() => {
          fixture.detectChanges();
        });

        it('should be a formGroup instance', () => {
          expect(app.formGroup).toBeInstanceOf(FormGroup);
        });

        it('should have 2 formControl', () => {
          const controls = app.formGroup.controls;
          const controlNum = 2;

          expect(Object.keys(controls).length).toBe(controlNum);
        });

        describe('account control', () => {
          it('should have required validator', () => {
            const control = app.formGroup.get('acc')!;
            const controlValue = '';
            let controlError: ValidationErrors | null;

            control.setValue(controlValue);
            controlError = control.errors!;

            expect(controlError['required']).toBeTrue();
          });

          it('should have pattern validator', () => {
            const control = app.formGroup.get('acc')!;
            const controlValue = '123';
            let controlError: ValidationErrors | null;

            control.setValue(controlValue);
            controlError = control.errors!;

            expect(controlError['pattern']).toBeTruthy();
          });

          it('should have pattern validator', () => {
            const control = app.formGroup.get('acc')!;
            const controlValue = '123';
            let controlError: ValidationErrors | null;

            control.setValue(controlValue);
            controlError = control.errors!;

            expect(controlError['pattern']).toBeTruthy();
          });
        });

        describe('pwd control', () => {
          it('should have required validator', () => {
            const control = app.formGroup.get('pwd')!;
            const controlValue = '';
            let controlError: ValidationErrors | null;

            control.setValue(controlValue);
            controlError = control.errors!;

            expect(controlError['required']).toBeTrue();
          });

          it('should have min-length validator', () => {
            const control = app.formGroup.get('pwd')!;
            const controlValue = '123';
            let controlError: ValidationErrors | null;

            control.setValue(controlValue);
            controlError = control.errors!;

            expect(controlError['minlength']).toBeTruthy();
          });

          it('should have max-length validator', () => {
            const control = app.formGroup.get('pwd')!;
            const controlValue = '123456798123456789';
            let controlError: ValidationErrors | null;

            control.setValue(controlValue);
            controlError = control.errors!;

            expect(controlError['maxlength']).toBeTruthy();
          });
        });
      });
    });
  });

  describe('Integration Testing :', () => {
    let compiledComponent: HTMLElement;
    beforeEach(() => {
      fixture.detectChanges();
      compiledComponent = fixture.debugElement.nativeElement;
    });

    describe('account input field', () => {
      let accInputElement: HTMLInputElement;
      beforeEach(() => {
        accInputElement = compiledComponent.querySelector('#account')!;
      });

      it('should have attribute "type" and its value is "email"', () => {
        const attributeName = 'type';
        const attributeValue = 'email';

        expect(accInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      it('should binding formControl with input element(method_1)', () => {
        const userInput = 'userInputString';

        app.formGroup.get('acc')?.patchValue(userInput);
        fixture.detectChanges();

        // can see property value in Object
        // console.log({ accInputElement });
        // can't see property value in Element
        // console.log(accInputElement);

        expect(accInputElement.value).toBe(userInput);
      });

      it('should binding formControl with input element(method_2)', () => {
        const attributeName = 'ng-reflect-name';
        const attributeValue = 'acc';

        expect(accInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });
    });

    describe('pwd input field', () => {
      let pwdInputElement: HTMLInputElement;

      beforeEach(() => {
        pwdInputElement = compiledComponent.querySelector('#password')!;
      });

      it('should have attribute "type" and its value is "password"', () => {
        const attributeName = 'type';
        const attributeValue = 'password';

        expect(pwdInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      it('should binding formControl with input element', () => {
        const attributeName = 'ng-reflect-name';
        const attributeValue = 'pwd';

        expect(pwdInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });
    });

    describe('Error Message', () => {
      it('should show "this is required!" when acc control has this error', () => {
        const msg = 'this is required!';
        const targetElement = compiledComponent.querySelector('#account ~ .error-msg')!;
        const control = app.formGroup.get('acc')!;

        control.setValue('');
        control.markAsDirty();
        fixture.detectChanges();

        expect(targetElement.textContent).toBe(msg);
      });

      it('should show "pattern error!" when acc control has this error', () => {
        const msg = 'pattern error!';
        const targetElement = compiledComponent.querySelector('#account ~ .error-msg')!;
        const control = app.formGroup.get('acc')!;

        control.setValue('132');
        control.markAsDirty();
        fixture.detectChanges();

        expect(targetElement.textContent).toBe(msg);
      });

      it('should show "this is required!" when pwd control has this error', () => {
        const msg = 'this is required!';
        const targetElement = compiledComponent.querySelector('#password ~ .error-msg')!;
        const control = app.formGroup.get('pwd')!;

        control.setValue('');
        control.markAsDirty();
        fixture.detectChanges();

        expect(targetElement.textContent).toBe(msg);
      });

      it('should show "minlenth 8!" when pwd control has this error', () => {
        const msg = 'minlenth 8!';
        const targetElement = compiledComponent.querySelector('#password ~ .error-msg')!;
        const control = app.formGroup.get('pwd')!;

        control.setValue('123');
        control.markAsDirty();
        fixture.detectChanges();

        expect(targetElement.textContent).toBe(msg);
      });

      it('should show "maxlength 16!" when pwd control has this error', () => {
        const msg = 'maxlength 16!';
        const targetElement = compiledComponent.querySelector('#password ~ .error-msg')!;
        const control = app.formGroup.get('pwd')!;

        control.setValue('123456789123456789');
        control.markAsDirty();
        fixture.detectChanges();

        expect(targetElement.textContent).toBe(msg);
      });
    });

    describe('Login Button', () => {
      let buttonElement: HTMLButtonElement;

      beforeEach(() => {
        buttonElement = compiledComponent.querySelector('button')!;
      });

      it('should have attribute "type" and value is "submit"', () => {
        const attributeName = 'type';
        const attributeValue = 'submit';

        expect(buttonElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      it('should have attribute "disabled" when formGroup is invalid', () => {
        const attributeName = 'disabled';

        expect(buttonElement.hasAttribute(attributeName)).toBeTrue();
      });

      describe('when formGroup status is valid', () => {
        beforeEach(() => {
          app.formGroup.setValue({
            acc: '132@aaa.com',
            pwd: '123456789',
          });
          fixture.detectChanges();
        });

        it('should have attribute "disabled" when formGroup is invalid', () => {
          const attributeName = 'disabled';

          expect(buttonElement.hasAttribute(attributeName)).toBeFalse();
        });

        it('should trigger function "log" when click button', () => {
          spyOn(app, 'log');

          buttonElement.click();

          expect(app.log).toHaveBeenCalled();
        });
      });
    });
  });
});
