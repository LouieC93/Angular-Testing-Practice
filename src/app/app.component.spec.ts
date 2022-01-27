import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('function accountValueChange', () => {
    it('should set value into property "account"', () => {
      const acc = 'aa@aa.com';
      const err = null;
      app.accountValueChange(acc, err);
      expect(app.account).toBe(acc);
    });
    it('should set error msg "this is required!" into property "accountError" when enter empty string', () => {
      const acc = '';
      const error = { required: true };
      const msg = 'this is required!';
      app.accountValueChange(acc, error);
      expect(app.accountErrorMsg).toBe(msg);
    });
    it('should set error msg "pattern error!" into property "accountError" when enter invalid string', () => {
      const acc = 'aaaa1111';
      const error = {
        pattern: {
          actualValue: acc,
          requiredpattern: '^\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b$',
        },
      };
      const msg = 'pattern error!';
      app.accountValueChange(acc, error);
      expect(app.accountErrorMsg).toBe(msg);
    });
    it('should set error msg "" into property "accountError" when enter correct string', () => {
      const acc = 'aaaa1111@bbb.com';
      const error = null;
      const msg = '';
      app.accountValueChange(acc, error);
      expect(app.accountErrorMsg).toBe(msg);
    });
  });
});
