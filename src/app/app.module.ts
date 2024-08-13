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

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'local-storage', component: LocalStorageComponent },
];

@NgModule({
  declarations: [AppComponent, LocalStorageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
