import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocationService } from '../location.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
})
export class ProfileEditorComponent implements OnInit {
  profileForm: FormGroup;
  userData = { firstName: '', lastName: '', city: '', district: '' };
  tempUserData = { firstName: '', lastName: '', city: '', district: '' };
  isBrowser: boolean = true;
  notificationMessage: string = '';
  showNotification: boolean = false;
  notificationType: string | undefined;
  cities: any[] = [];
  districts: any[] = [];
  allDistricts: any[] = [];
  selectedCityId: string = '';
  notificationMessage2: string = '';
  showNotification2: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private locationService: LocationService,
    private translate: TranslateService
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
    if (this.profileForm.valid) {
      const cityId = this.profileForm.controls['city'].value;
      const districtId = this.profileForm.controls['district'].value;

      const cityName =
        this.cities.find((city) => city.id == cityId)?.name || '';
      const districtName =
        this.districts.find((district) => district.id == districtId)?.name ||
        '';

      this.userData = {
        ...this.profileForm.value,
        city: cityName,
        district: districtName,
      };

      this.saveProfile(this.userData);
    } else {
      console.warn('Form is not valid.');
    }
  }

  saveProfile(userData: {
    firstName: string;
    lastName: string;
    city: string;
    district: string;
  }) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Saving profile...');
      localStorage.setItem('profileData', JSON.stringify(userData));

      this.translate
        .get('usersuccess')
        .subscribe((translatedMessage: string) => {
          this.notificationMessage2 = translatedMessage;
          this.showNotification2 = true;

          setTimeout(() => (this.showNotification2 = false), 4000);
        });
    }
  }

  loadProfile() {
    if (isPlatformBrowser(this.platformId)) {
      const savedData = localStorage.getItem('profileData');
      if (savedData) {
        const storedData = JSON.parse(savedData);

        this.locationService.getCities().subscribe((cities: any) => {
          this.cities = cities.data;
          const city = this.cities.find(
            (city) => city.name === storedData.city
          );
          if (city) {
            this.profileForm.controls['city'].setValue(city.id);
            this.selectedCityId = city.id;
            this.onCityChange();

            this.locationService.getDistricts().subscribe((districts: any) => {
              this.allDistricts = districts.data;
              const district = this.allDistricts.find(
                (district) => district.name === storedData.district
              );
              if (district) {
                this.profileForm.controls['district'].setValue(district.id);
              }
            });
          }
        });
      } else {
        console.warn('No data found in Local Storage.');
      }
    }
  }

  clearData(): void {
    if (this.isBrowser) {
      this.translate
        .get('deleteusersure')
        .subscribe((confirmationMessage: string) => {
          const confirmed = confirm(confirmationMessage);
          if (confirmed) {
            localStorage.clear();
            this.userData = {
              firstName: '',
              lastName: '',
              city: '',
              district: '',
            };

            this.translate
              .get('USER_INFO_DELETED')
              .subscribe((notificationMessage: string) => {
                this.notificationMessage = notificationMessage;
                this.showNotification = true;

                setTimeout(() => (this.showNotification = false), 4000);
              });
          }
        });
    }
  }

  loadCities() {
    this.locationService.getCities().subscribe((cities: any) => {
      this.cities = cities.data;
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
    this.selectedCityId = this.profileForm.controls['city'].value;
    this.districts = this.allDistricts.filter(
      (x) => x.provinceId == this.selectedCityId
    );
  }
}
