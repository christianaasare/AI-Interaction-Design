import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';

import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from '../service/excel.service';
import { SelectScenarioComponent } from './select-scenario/select-scenario.component';
import { UserquestionComponent } from './userquestion/userquestion.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';
@NgModule({
  declarations: [
    AppComponent,
    SelectScenarioComponent,
    UserquestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    NgxImageZoomModule
  ],

  bootstrap: [AppComponent],
  providers: [ExcelService]
})
export class AppModule { }
