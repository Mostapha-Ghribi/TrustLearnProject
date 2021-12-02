import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { StudentGuard } from './guards/student.guard';

import { HomeComponent } from './components/public/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { AboutComponent } from './components/public/about/about.component';
import { ContactComponent } from './components/public/contact/contact.component';
import { CoursesComponent } from './components/public/courses/courses.component';
import { StudentcoursesComponent } from './components/public/studentcourses/studentcourses.component';
import { CoursedetailComponent } from './components/public/coursedetail/coursedetail.component';
import { TrainersComponent } from './components/public/trainers/trainers.component';
import { EventsComponent } from './components/public/events/events.component';
import { Page404Component } from './components/public/page404/page404.component';
import { DashboardComponent } from './components/private/shared/dashboard/dashboard.component';
import { ListcategoryComponent } from './components/private/admin/category/listcategory/listcategory.component';
import { ListformationComponent } from './components/private/admin/formations/listformation/listformation.component';
import { ListformateursComponent } from './components/private/admin/formateurs/listformateurs/listformateurs.component';
import { ListetudiantComponent } from './components/private/admin/etudiants/listetudiant/listetudiant.component';
import { AddcategoryComponent } from './components/private/admin/category/addcategory/addcategory.component';
import { UpdatecategoryComponent } from './components/private/admin/category/updatecategory/updatecategory.component';
import { UpdateformationComponent } from './components/private/admin/formations/updateformation/updateformation.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'aboutus',
    component: AboutComponent
  },
  {
    path: 'contactus',
    component: ContactComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'mycourses',
    component: StudentcoursesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'coursedetail/:id',
    component: CoursedetailComponent
  },
  {
    path: 'trainers',
    component: TrainersComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listcategory',
    component: ListcategoryComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'listformation',
    component: ListformationComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'listformateur',
    component: ListformateursComponent,
    canActivate: [AdminGuard]

  },
  {
    path: 'listetudiant',
    component: ListetudiantComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'addcategory',
    component: AddcategoryComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'updatecategory/:id',
    component: UpdatecategoryComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'updateformation/:id',
    component: UpdateformationComponent,
    canActivate: [AdminGuard],
  },
  {
    path: '**',
    component: Page404Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
