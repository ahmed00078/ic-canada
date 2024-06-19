import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MakingAppComponent } from './making-app/making-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppReaderComponent } from './app-reader/app-reader.component';
import { HomeComponent } from './home/home.component';
import { S6o8o1RegisterComponent } from './s6-projet/s6o8-auth/s6o8o1-register/s6o8o1-register.component';
import { S6o8o2LoginComponent } from './s6-projet/s6o8-auth/s6o8o2-login/s6o8o2-login.component';
import { S6o7HomeComponent } from './s6-projet/s6o7-home/s6o7-home.component';
import { S6o6NavComponent } from './s6-projet/s6o6-nav/s6o6-nav.component';
import { S6o8o3ForgotPasswordComponent } from './s6-projet/s6o8-auth/s6o8o3-forgot-password/s6o8o3-forgot-password.component';
import { S6o8o4ConfirmationMsgComponent } from './s6-projet/s6o8-auth/s6o8o4-confirmation-msg/s6o8o4-confirmation-msg.component';
import { S6o5o1GestionDBComponent } from './s6-projet/s6o5-pages/s6o5o1-GestionDB/s6o5o1-GestionDB.component';
import { S6o4o3AllTablesComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o3-allTables/s6o4o3-allTables.component';
import { S6o4o6TabComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o6-conception/s6o4o6-tab.component';
import { S6o4o7DataTabComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o7-dataTab/s6o4o7-dataTab.component';
import { S6o4o8DataFormComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o8-dataForm/s6o4o8-dataForm.component';
import { S6o4o9AllCategoriesComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o9-allCategories/s6o4o9-allCategories.component';
import { S6o4o11ExcelListComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o11-listType/s6o4o11-excelList/s6o4o11-excelList.component';
import { S6o4o11ListComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o11-listType/s6o4o11-list/s6o4o11-list.component';
import { S6o4o11PredValComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o11-listType/s6o4o11-predVal/s6o4o11-predVal.component';
import { S6o4o11FromOurDBComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o11-listType/s6o4o11-fromOurDB/s6o4o11-fromOurDB.component';
import { S6o4o12TwoTablesComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o12-TwoTablesf/s6o4o12-twoTables/s6o4o12-twoTables.component';
import { S6o4o13DataTwoTablesComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o12-TwoTablesf/s6o4o13-dataTwoTables/s6o4o13-dataTwoTables.component';
import { S6o4o14TwoTabDataTabComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o12-TwoTablesf/s6o4o14-TwoTabDataTab/s6o4o14-TwoTabDataTab.component';
import { S6o4o15TwoTabDataTabLieComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o12-TwoTablesf/s6o4o15-TwoTabDataTabLie/s6o4o15-TwoTabDataTabLie.component';
import { S6o4o16TwoTabDataFormsComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o12-TwoTablesf/s6o4o16-TwoTabDataForms/s6o4o16-TwoTabDataForms.component';
import { S6o4o17TwoTabDataFormsLieComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o12-TwoTablesf/s6o4o17-TwoTabDataFormsLie/s6o4o17-TwoTabDataFormsLie.component';
import { S6o5o2GestionRapportsComponent } from './s6-projet/s6o5-pages/s6o5o2-GestionRapports/s6o5o2-GestionRapports.component';
import { S6o9SidebarComponent } from './s6-projet/s6o9-sidebar/s6o9-sidebar.component';
import { S6o5o3GestionAccessComponent } from './s6-projet/s6o5-pages/s6o5o3-GestionAccess/s6o5o3-GestionAccess.component';
import { S6o4o18CatTableComponent } from './s6-projet/s6o4-gestionDBcomponents/s6o4o12-TwoTablesf/s6o4o18-CatTable/s6o4o18-CatTable.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MakingAppComponent,
    AppReaderComponent,
    HomeComponent,
    S6o8o1RegisterComponent,
    S6o8o2LoginComponent,
    S6o7HomeComponent,
    S6o6NavComponent,
    S6o8o3ForgotPasswordComponent,
    S6o8o4ConfirmationMsgComponent,
    S6o5o1GestionDBComponent,
    S6o4o3AllTablesComponent,
    S6o4o6TabComponent,
    S6o4o7DataTabComponent,
    S6o4o8DataFormComponent,
    S6o4o9AllCategoriesComponent,
    S6o4o11ExcelListComponent,
    S6o4o11ListComponent,
    S6o4o11PredValComponent,
    S6o4o11FromOurDBComponent,
    S6o4o12TwoTablesComponent,
    S6o4o13DataTwoTablesComponent,
    S6o4o14TwoTabDataTabComponent,
    S6o4o15TwoTabDataTabLieComponent,
    S6o4o16TwoTabDataFormsComponent,
    S6o4o17TwoTabDataFormsLieComponent,
    S6o5o2GestionRapportsComponent,
    S6o9SidebarComponent,
    S6o5o3GestionAccessComponent,
    S6o4o18CatTableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
