import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LocalStorageComponent } from './local-storage/local-storage.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { LocationService } from './location.service';
import { ThemeService } from './theme.service';
import { SpinnerComponent } from './spinner/spinner.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'local-storage', component: LocalStorageComponent },
  { path: 'forms', component: ProfileEditorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LocalStorageComponent,
    HomeComponent,
    ProfileEditorComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    LocationService,
    ThemeService,
    SpinnerComponent,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
