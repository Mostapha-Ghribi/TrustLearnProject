import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './components/public/shared/footer/footer.component';
import { NavbarComponent } from './components/public/shared/navbar/navbar.component';
import { HomeComponent } from './components/public/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { AboutComponent } from './components/public/about/about.component';
import { ContactComponent } from './components/public/contact/contact.component';
import { CoursesComponent } from './components/public/courses/courses.component';
import { CoursedetailComponent } from './components/public/coursedetail/coursedetail.component';
import { TrainersComponent } from './components/public/trainers/trainers.component';
import { EventsComponent } from './components/public/events/events.component';
import { Page404Component } from './components/public/page404/page404.component';
import { DashboardComponent } from './components/private/shared/dashboard/dashboard.component';
import { SidebarComponent } from './components/private/shared/sidebar/sidebar.component';
import { TopbarComponent } from './components/private/shared/topbar/topbar.component';
import { ListcategoryComponent } from './components/private/admin/category/listcategory/listcategory.component';
import { AddcategoryComponent } from './components/private/admin/category/addcategory/addcategory.component';
import { UpdatecategoryComponent } from './components/private/admin/category/updatecategory/updatecategory.component';
import { ListetudiantComponent } from './components/private/admin/etudiants/listetudiant/listetudiant.component';
import { ListformateursComponent } from './components/private/admin/formateurs/listformateurs/listformateurs.component';
import { UpdateformationComponent } from './components/private/admin/formations/updateformation/updateformation.component';
import { ListformationComponent } from './components/private/admin/formations/listformation/listformation.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ContactComponent,
    CoursesComponent,
    CoursedetailComponent,
    TrainersComponent,
    EventsComponent,
    Page404Component,
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    ListcategoryComponent,
    AddcategoryComponent,
    UpdatecategoryComponent,
    ListetudiantComponent,
    ListformateursComponent,
    UpdateformationComponent,
    ListformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
