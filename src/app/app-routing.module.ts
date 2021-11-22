import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { EventsComponent } from './events/events.component';
import { PricingComponent } from './pricing/pricing.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TrainersComponent } from './trainers/trainers.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path:'',
    component:WelcomeComponent
    
  },
  {

    path:'about',
    component:AboutComponent

  },
  {

    path:'courses',
    component:CoursesComponent

  },
  {

    path:'trainers',
    component:TrainersComponent

  },
  {

    path:'events',
    component:EventsComponent

  },
  {

    path:'pricing',
    component:PricingComponent

  },
  {

    path:'contact',
    component:ContactComponent

  },
  {

    path:'signin',
    component:SigninComponent

  },
  {

    path:'signup',
    component:SignupComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
