import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  //* Form Validation 

  formSubmitted = false;
  
    registrationFormGroup = new FormGroup({
    name: new  FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern('((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15})')])


  });

   //* Form Validation 

  onSubmit(): void{
    this.formSubmitted = true;
    if (this.registrationFormGroup.valid){
      return;
    }
  }

  //* 

  loginForm1 = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),

  });

  //* 


  constructor(private auth: AuthService, private router: Router) { }

  // this ngoninit do that user can not go back to login page untill they logout

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['admin']);
    }
  }

  onSubmit1(): void {
    if (this.loginForm1.valid) {
      this.auth.login(this.loginForm1.value).subscribe(
        (result) => {
          console.log(result);
          this.router.navigate(['/admin']);
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    }
  }
}
