import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SelectScenarioComponent } from './select-scenario/select-scenario.component';
import { UserquestionComponent } from './userquestion/userquestion.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full'},
  {path: 'Home', component: SelectScenarioComponent},
  {path: 'survey', component: UserquestionComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
