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

    describe('after ngOninit', () => {
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
