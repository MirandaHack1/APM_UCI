import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./Pages/Public/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'user-register',
    loadChildren: () =>
      import('./Pages/Public/user-register/user-register.module').then(
        (m) => m.UserRegisterPageModule
      ),
  },
  {
    path: 'password-recovery',
    loadChildren: () =>
      import('./Pages/Public/password-recovery/password-recovery.module').then(
        (m) => m.PasswordRecoveryPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./Pages/Secure/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'business-information',
    loadChildren: () =>
      import(
        './Pages/Secure/business-information/business-information.module'
      ).then((m) => m.BusinessInformationPageModule),
  },

  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'check-token',
    loadChildren: () =>
      import('./Pages/Public/check-token/check-token.module').then(
        (m) => m.CheckTokenPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./Pages/Public/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'user-register',
    loadChildren: () =>
      import('./Pages/Public/user-register/user-register.module').then(
        (m) => m.UserRegisterPageModule
      ),
  },
  {
    path: 'password-recovery',
    loadChildren: () =>
      import('./Pages/Public/password-recovery/password-recovery.module').then(
        (m) => m.PasswordRecoveryPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./Pages/Secure/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'business-information',
    loadChildren: () =>
      import(
        './Pages/Secure/business-information/business-information.module'
      ).then((m) => m.BusinessInformationPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'check-token',
    loadChildren: () =>
      import('./Pages/Public/check-token/check-token.module').then(
        (m) => m.CheckTokenPageModule
      ),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./Pages/Public/change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },

  {
    path: 'user-rol',
    loadChildren: () =>
      import('./Pages/Secure/user-rol/user-rol.module').then(
        (m) => m.UserRolPageModule
      ),
  },
  {
    path: 'edit-business-information',
    loadChildren: () =>
      import(
        './Pages/Secure/edit-business-information/edit-business-information.module'
      ).then((m) => m.EditBusinessInformationPageModule),
  },
  {
    path: 'edit-user-rol',
    loadChildren: () =>
      import('./Pages/Secure/edit-user-rol/edit-user-rol.module').then(
        (m) => m.EditUserRolPageModule
      ),
  },
  {
    path: 'info-client',
    loadChildren: () =>
      import('./Pages/Secure/info-client/info-client.module').then(
        (m) => m.InfoClientPageModule
      ),
  },
  {
    path: 'edit-info-client',
    loadChildren: () =>
      import('./Pages/Secure/edit-info-client/edit-info-client.module').then(
        (m) => m.EditInfoClientPageModule
      ),
  },
  {
    path: 'credentials-info',
    loadChildren: () =>
      import('./Pages/Secure/credentials-info/credentials-info.module').then(
        (m) => m.CredentialsInfoPageModule
      ),
  },
  {
    path: 'edit-credentials-info',
    loadChildren: () =>
      import(
        './Pages/Secure/edit-credentials-info/edit-credentials-info.module'
      ).then((m) => m.EditCredentialsInfoPageModule),
  },
  {
    path: 'sports-group',
    loadChildren: () =>
      import('./Pages/Secure/sports-group/sports-group.module').then(
        (m) => m.SportsGroupPageModule
      ),
  },
  {
    path: 'edit-sports-group',
    loadChildren: () =>
      import('./Pages/Secure/edit-sports-group/edit-sports-group.module').then(
        (m) => m.EditSportsGroupPageModule
      ),
  },
  {
    path: 'group-stage',
    loadChildren: () =>
      import('./Pages/Secure/group-stage/group-stage.module').then(
        (m) => m.GroupStagePageModule
      ),
  },
  {
    path: 'avaliable-dates',
    loadChildren: () =>
      import('./Pages/Secure/avaliable-dates/avaliable-dates.module').then(
        (m) => m.AvaliableDatesPageModule
      ),
  },
  {
    path: 'edit-avaliable-dates',
    loadChildren: () =>
      import(
        './Pages/Secure/edit-avaliable-dates/edit-avaliable-dates.module'
      ).then((m) => m.EditAvaliableDatesPageModule),
  },
  {
    path: 'teamplayer',
    loadChildren: () =>
      import('./Pages/Secure/teamplayer/teamplayer.module').then(
        (m) => m.TeamplayerPageModule
      ),
  },
  {
    path: 'edit-teamplayer',
    loadChildren: () =>
      import('./Pages/Secure/edit-teamplayer/edit-teamplayer.module').then(
        (m) => m.EditTeamplayerPageModule
      ),
  },
  {
    path: 'court',
    loadChildren: () =>
      import('./Pages/Secure/court/court.module').then(
        (m) => m.CourtPageModule
      ),
  },
  {
    path: 'edit-court',
    loadChildren: () =>
      import('./Pages/Secure/edit-court/edit-court.module').then(
        (m) => m.EditCourtPageModule
      ),
  },
  {
    path: 'matches',
    loadChildren: () =>
      import('./Pages/Secure/matches/matches.module').then(
        (m) => m.MatchesPageModule
      ),
  },
  {
    path: 'edit-matches',
    loadChildren: () =>
      import('./Pages/Secure/edit-matches/edit-matches.module').then(
        (m) => m.EditMatchesPageModule
      ),
  },
  {
    path: 'info-matches-general',
    loadChildren: () =>
      import(
        './Pages/Secure/info-matches-general/info-matches-general.module'
      ).then((m) => m.InfoMatchesGeneralPageModule),
  },
  {
    path: 'vocalia-sheet',
    loadChildren: () =>
      import('./Pages/Secure/vocalia-sheet/vocalia-sheet.module').then(
        (m) => m.VocaliaSheetPageModule
      ),
  },
  {
    path: 'edit-vocalia-sheet',
    loadChildren: () =>
      import(
        './Pages/Secure/edit-vocalia-sheet/edit-vocalia-sheet.module'
      ).then((m) => m.EditVocaliaSheetPageModule),
  },

  {
    path: 'search-players',
    loadChildren: () =>
      import(
        './Pages/Secure/edit-sports-group/search-players/search-players.module'
      ).then((m) => m.SearchPlayersPageModule),
  },
  {
    path: 'rules',
    loadChildren: () =>
      import('./Pages/Secure/rules/rules.module').then(
        (m) => m.RulesPageModule
      ),
  },
  {
    path: 'edit-rules',
    loadChildren: () =>
      import('./Pages/Secure/edit-rules/edit-rules.module').then(
        (m) => m.EditRulesPageModule
      ),
  },
  {
    path: 'sport-group-players',
    loadChildren: () =>
      import(
        './Pages/Secure/sport-group-players/sport-group-players.module'
      ).then((m) => m.SportGroupPlayersPageModule),
  },
  {
    path: 'edit-sport-group-players',
    loadChildren: () =>
      import(
        './Pages/Secure/edit-sport-group-players/edit-sport-group-players.module'
      ).then((m) => m.EditSportGroupPlayersPageModule),
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('./Pages/Secure/groups/groups.module').then(
        (m) => m.GroupsPageModule
      ),
  },
  {
    path: 'edit-groups',
    loadChildren: () =>
      import('./Pages/Secure/edit-groups/edit-groups.module').then(
        (m) => m.EditGroupsPageModule
      ),
  },
  {
    path: 'edit-group-stage',
    loadChildren: () =>
      import('./Pages/Secure/edit-group-stage/edit-group-stage.module').then(
        (m) => m.EditGroupStagePageModule
      ),
  },
  {
    path: 'busineess-headquarters',
    loadChildren: () =>
      import(
        './Pages/Secure/busineess-headquarters/busineess-headquarters.module'
      ).then((m) => m.BusineessHeadquartersPageModule),
  },
  {
    path: 'edit-headquarters',
    loadChildren: () =>
      import('./Pages/Secure/edit-headquarters/edit-headquarters.module').then(
        (m) => m.EditHeadquartersPageModule
      ),
  },
  {
    path: 'search-group-players',
    loadChildren: () =>
      import(
        './Pages/Secure/edit-sport-group-players/search-group-players/search-group-players.module'
      ).then((m) => m.SearchGroupPlayersPageModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
