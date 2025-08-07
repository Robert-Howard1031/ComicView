import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { AddComicComponent } from './pages/add-comic/add-comic.component';
import { ComicComponent } from './pages/comic/comic.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'add-comic', component: AddComicComponent },
  { path: 'comic/:id', component: ComicComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
