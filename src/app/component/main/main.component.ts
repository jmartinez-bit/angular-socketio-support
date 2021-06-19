import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {

  angForm!: FormGroup;
  user = { email: '', username: '' };

  get f() {
    return  this.angForm.controls;
  }

  constructor( 
    private fb: FormBuilder,
    private router: Router ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.angForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onClickSubmit(): void {
    this.router.navigate(['/chat/', this.user.username]);
  }

}
