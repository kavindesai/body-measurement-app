import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import {AppRoutingModule, routingComponents} from './app-routing-module'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { NavComponent } from './nav/nav.component';
import { EndpointsService } from './endpoints.service';
import { ProfileComponent } from './profile/profile.component';
import { AttributeComponent } from './attribute/attribute.component';
import { VisualizeComponent } from './visualize/visualize.component';
import { DeleteComponent } from './delete/delete.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    NavComponent,
    ProfileComponent,
    AttributeComponent,
    VisualizeComponent,
    DeleteComponent,
    AddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EndpointsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
