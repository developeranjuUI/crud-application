import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss']
})
export class AddTutorialComponent implements OnInit{
  tutorialForm!: FormGroup;
  isSubmittedSuccessfully = false;
  isLoading = false;
  errorMessage = '';

  tutorials: Tutorial = {
    title: '',
    description: '',
    published: false,
  };
  submitted = false;
title: any;
  constructor(private tutorialService: TutorialService, private fb: FormBuilder, private toastr: ToastrService){ }
  ngOnInit(): void {
    this.tutorialForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      published: [false]
    });
  }

  get f() {
    return this.tutorialForm.controls;
  }

  saveTutorial(): void {
    this.submitted = true;
    this.isSubmittedSuccessfully = false;
    this.errorMessage = '';

    if (this.tutorialForm.invalid) {
      // this.isSubmittedSuccessfully = false;
      return;
    }

    this.isLoading = true;
    const data = this.tutorialForm.value;
    
    this.tutorialService.create(data).subscribe({
      next: (res) => {
        // console.log('Tutorial created:', res);
        this.toastr.success('Tutorial added successfully!', 'Success');
        // this.isSubmittedSuccessfully = true;
        this.submitted = false;
        this.isLoading = false;
        this.tutorialForm.reset(); // Reset form after submission
        setTimeout(() => {
          this.toastr.clear();
        }, 3000);
      },
      error: (err) => {
        console.log('Error:', err);
        // this.isSubmittedSuccessfully = false;
        this.isLoading = false;
        // this.errorMessage = 'Failed to add tutorial. Please try again later.';
        this.toastr.error('Failed to add tutorial. Please try again.', 'Error');
      }
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorialForm.reset();
    this.tutorials = {
      title: '',
      description: '',
      published: false
    };
  }
}
