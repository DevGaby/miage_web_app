import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { CoursComponent } from './cours/cours.component';
import { ProgrammeComponent } from './programme/programme.component';
import { ProfComponent } from './prof/prof.component';
import { ModalComponent } from './modal/modal.component';


const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'programme', component: ProgrammeComponent },
  { path: 'professeur', component: ProfComponent },
  { path: 'modal', component: ModalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
