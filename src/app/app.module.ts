import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { BannerEditComponent } from './banner-edit/banner-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, BannerListComponent, BannerEditComponent],
  imports: [
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
