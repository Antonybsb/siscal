import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CalendarioComponent } from './components/calendario/calendario/calendario.component';

const routes: Routes = [
  { path:'/', component: LoginComponent },
  { path:'calendario', component: CalendarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
