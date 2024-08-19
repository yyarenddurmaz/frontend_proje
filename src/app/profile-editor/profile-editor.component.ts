import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
})
export class ProfileEditorComponent implements OnInit {
  profileForm: FormGroup;
  userData = { firstName: '', lastName: '', city: '', district: '' };
  tempUserData = { firstName: '', lastName: '', city: '', district: '' };
  isBrowser: boolean;
  notificationMessage: string = '';
  showNotification: boolean = false;
  notificationType: string | undefined;
  cities: any[] = [];
  districts: any[] = [];
  allDistricts: any[] = [];
  selectedCityId: string = '';
  FormGroup: any;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private locationService: LocationService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.profileForm = this.formBuilder.group({
      firstName: new FormControl<string>('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      lastName: new FormControl<string>('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      city: new FormControl<string>(
        this.tempUserData.city,
        Validators.required
      ),
      district: new FormControl<string>(
        this.tempUserData.district,
        Validators.required
      ),
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
    this.loadCities();
    this.loadDistricts();
  }

  onSubmit() {
    this.userData = this.profileForm.value;
    console.warn(this.userData);
    this.saveProfile(this.userData);
  }

  updateProfile(userData: {
    firstName: string;
    lastName: string;
    city: string;
    district: string;
  }) {
    this.tempUserData = { ...userData };
    this.profileForm.patchValue({
      firstName: userData.firstName,
      lastName: userData.lastName,
      city: userData.city,
      district: userData.district,
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
  clearData(): void {
    if (this.isBrowser) {
      const confirmed = confirm(
        `Are you sure you want to delete user information?`
      );

      if (confirmed) {
        localStorage.clear();
        this.tempUserData = {
          firstName: '',
          lastName: '',
          city: '',
          district: '',
        };
        this.profileForm.reset();
        this.notificationMessage = `User information has been deleted.`;
        this.showNotification = true;
      }
    }
    this.showNotification = true;
    setTimeout(() => (this.showNotification = false), 4000);
  }
  loadCities() {
    this.locationService.getCities().subscribe((cities: any) => {
      this.cities = cities.data;

      if (this.selectedCityId) {
        // this.onCityChange(this.selectedCityId);
      }
    });
  }

  loadDistricts() {
    this.locationService.getDistricts().subscribe((districts: any) => {
      this.allDistricts = districts.data;

      if (this.userData.city) {
        this.onCityChange();
      }
    });
  }

  onCityChange(): void {
    this.selectedCityId = this.userData.city;
    debugger;
    this.districts = this.allDistricts.filter(
      (x) => x.provinceId == this.selectedCityId
    );
  }
}
