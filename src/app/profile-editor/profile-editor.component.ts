import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
})
export class ProfileEditorComponent implements OnInit {

  profileForm: FormGroup;
  userData = { firstName: '', lastName: '', city: '', district: '' };
  isBrowser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: this.formBuilder.group({
        city: ['', Validators.required],
        district: ['', Validators.required],
      }),
    });

    if (this.isBrowser) {
      this.loadProfile();
    }
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      console.warn('Local Storage is not available in this environment.');
    }
    if (this.isBrowser) {
      this.loadProfile();
    }
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }

  updateProfile(userData: {
    firstName: string;
    lastName: string;
    city: string;
    district: string;
  }) {
    this.profileForm.patchValue({
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: {
        city: userData.city,
        district: userData.district,
      },
    });

    if (this.isBrowser) {
      this.saveProfile(userData);
    }
  }

  saveProfile(userData: {
    firstName: string;
    lastName: string;
    city: string;
    district: string;
  }) {
    if (this.isBrowser) {
      localStorage.setItem('profileData', JSON.stringify(userData));
    }
  }

  loadProfile() {
    if (this.isBrowser) {
      const savedData = localStorage.getItem('profileData');
      if (savedData) {
        this.userData = JSON.parse(savedData);
        this.updateProfile(this.userData);
      } else {
        console.warn('No data found in Local Storage.');
      }
    }
  }
}
