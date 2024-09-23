import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-standings-groups',
  templateUrl: './standings-groups.page.html',
  styleUrls: ['./standings-groups.page.scss'],
})
export class StandingsGroupsPage implements OnInit {
  search:string='';
  groupedTeams: any[] = [];

  constructor(private authService: AuthService,   public navCtrl: NavController) { }

  ngOnInit() {
    this.loadGroupStandings();
  }

  // Load standings data from PHP backend
  loadGroupStandings() {
    const postData = {
      accion: 'standingsgroups'
    };

    this.authService.postData(postData).subscribe(
      (response: any) => {
        if (response.estado === true) {
          const standingsData = response.datos;
          // Process and group teams by groupName
          const groups = this.groupTeamsByGroupName(standingsData);
          this.groupedTeams = this.sortTeamsAndMarkTop(groups);
        } else {
          console.error('Error fetching standings:', response.mensaje);
        }
      },
      (error) => {
        console.error('Error in PHP API call:', error);
      }
    );
  }

  
  // Group teams by groupName
  groupTeamsByGroupName(teams: any[]) {
    const grouped = teams.reduce((acc, team) => {
      let group = acc.find((g: { name: any; }) => g.name === team.GRUP_NAME);
      if (!group) {
        group = { name: team.GRUP_NAME, teams: [] };
        acc.push(group);
      }
      group.teams.push({
        name: team.SPG_TEAM_NAME,
        points: team.SPG_POINTS, 
        goalDifference: team.SPG_GOAL_DIFFERENCE, 
        playedMatches: team.SPG_STAG_PLAYED_MATCH, 
        isTopTeam: false 
      });
      return acc;
    }, []);
    return grouped;
  }

  // Sort teams by points and mark the top team
  sortTeamsAndMarkTop(groups: any[]) {
    groups.forEach(group => {
      // Sort teams by points in descending order
      group.teams.sort((a: { points: number; }, b: { points: number; }) => b.points - a.points);
      // Mark the first team as the top team
      if (group.teams.length > 0) {
        group.teams[0].isTopTeam = true;
      }
    });
    return groups;
  }

  cancelar(){
    this.navCtrl.back();
  }
}
