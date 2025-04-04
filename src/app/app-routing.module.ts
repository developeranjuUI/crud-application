import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialListsComponent } from './components/tutorial-lists/tutorial-lists.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialResolver } from './resolver/tutorial.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials',component: TutorialListsComponent },
  { path: 'tutorials/:id',component: TutorialDetailsComponent, resolve: { tutorial: TutorialResolver } },
  { path: 'add_tutorial', component: AddTutorialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
