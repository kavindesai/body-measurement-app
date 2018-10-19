import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AttributeComponent } from './attribute/attribute.component';
import { VisualizeComponent } from './visualize/visualize.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile/:email/:attribute/visualize', component : VisualizeComponent},
    {path: 'profile/:email/:attribute', component : AttributeComponent},
    {path: 'profile/:email', component : ProfileComponent}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ LoginComponent, RegisterComponent, ProfileComponent, AttributeComponent, VisualizeComponent ];
