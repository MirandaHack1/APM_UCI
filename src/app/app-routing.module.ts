import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/Public/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user-register',
    loadChildren: () => import('./Pages/Public/user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./Pages/Public/password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/Secure/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'business-information',
    loadChildren: () => import('./Pages/Secure/business-information/business-information.module').then( m => m.BusinessInformationPageModule)
  },
  {
    path: 'profile-admin',
    loadChildren: () => import('./Pages/Secure/profile-admin/profile-admin.module').then( m => m.ProfileAdminPageModule)
  },
  {
    path: 'information-admin',
    loadChildren: () => import('./Pages/Secure/information-admin/information-admin.module').then( m => m.InformationAdminPageModule)
  },
  {
    path: 'information-cordinator',
    loadChildren: () => import('./Pages/Secure/information-cordinator/information-cordinator.module').then( m => m.InformationCordinatorPageModule)
  },
  {
    path: 'profile-cordinator',
    loadChildren: () => import('./Pages/Secure/profile-cordinator/profile-cordinator.module').then( m => m.ProfileCordinatorPageModule)
  },
  {
    path: 'profile-students',
    loadChildren: () => import('./Pages/Secure/profile-students/profile-students.module').then( m => m.ProfileStudentsPageModule)
  },
  {
    path: 'information-students',
    loadChildren: () => import('./Pages/Secure/information-students/information-students.module').then( m => m.InformationStudentsPageModule)
  },
  {
    path: 'information-players',
    loadChildren: () => import('./Pages/Secure/information-players/information-players.module').then( m => m.InformationPlayersPageModule)
  },
  {
    path: 'profile-players',
    loadChildren: () => import('./Pages/Secure/profile-players/profile-players.module').then( m => m.ProfilePlayersPageModule)
  },  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
