import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { SearchPlayersPage } from './search-players/search-players.page';

@Component({
  selector: 'app-edit-sports-group',
  templateUrl: './edit-sports-group.page.html',
  styleUrls: ['./edit-sports-group.page.scss'],
})
export class EditSportsGroupPage implements OnInit {
  txt_nameGroup: string = "";
  txt_leader: string = "";
  txt_sportName: string = "";
  txt_sport_gender: string = "";
  txt_grandmother: string = "";
  txt_observations: string = "";
  txt_date: string = "";
  txt_grandmothercode : string = "";
  txt_pet: string = "";
  txt_firma : string = "";
  txt_logo : string = "";
  sports: any = [];
  cod: string = "";
  cod_group: string = "";
  leaderCode: string = "";
  grandmotherCode: string = "";
  petCode: string = "";
  logo: File | null = null;
  image: File | null = null; 
  logoUrl: string = ''; // Para previsualización del logo
  imageUrl: string = ''; // Para previsualización de la imagen
  constructor(
    public navCtrl: NavController,
    public servicio: AuthService,
    public modalCtrl: ModalController
  ) { 

    this.servicio.getSession('ICLI_CODE').then((res: any) => {

      this.cod = res;
      this.loadSport();
    });
    this.servicio.getSession('SPG_CODE').then((res: any) => {
      this.cod_group = res;
      if(this.cod_group){
        this.loadGroup();
        
      }
    });
  }
  ionViewWillEnter() {
    this.loadGroup();
  }

  ngOnInit() {
   
    this.txt_date = this.getCurrentDateInEcuador();
  }

  back() {
    this.navCtrl.back();
  }

  loadSport() {
    let datos = {
      "accion": "loadSport",
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.sports = res.info;
      } else {
       // this.servicio.showToast('No hay reglas disponibles.');
      }
    });
  }

  getCurrentDateInEcuador(): string {
    const date = new Date();
    const offset = -5; // Offset para Ecuador
    const localDate = new Date(date.getTime() + offset * 60 * 60 * 1000);
    return localDate.toISOString().split('T')[0];
  }

  async searchPlayer(player: string) {
    this.servicio.createSession('player_type', player);

    const modal = await this.modalCtrl.create({
      component: SearchPlayersPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { code, name } = result.data;
        if (player === 'pet') {
          this.txt_pet = name;
          this.petCode = code;
        } else if (player === 'grandmother') {
          this.txt_grandmother = name;
          this.grandmotherCode = code;
        } 
      }
    });

    return await modal.present();
  }
  
  

  loadGroup() {
    let datos = {
      "accion": "loadGroupData",
      "SPG_CODE": this.cod_group
    };
  
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        const info = res.info;
        this.txt_nameGroup = info.group_name;
        this.txt_date = info.creation_date;
        this.imageUrl = info.signature.replace(/\\/g, '');
        this.logoUrl = info.logo.replace(/\\/g, '');
        this.txt_observations = info.observations;
        this.txt_sport_gender = info.gender_team;
        this.txt_sportName = info.rule_code;
        this.txt_grandmother = info.godmother_name;
        this.grandmotherCode = info.godmother_code;
        this.txt_pet = info.pet_name;
        this.petCode = info.pet_code;

        this.txt_logo=  'http://127.0.0.1/APM_UCI/Ws_APM_BACK/'+this.logoUrl
        this.txt_firma=  'http://127.0.0.1/APM_UCI/Ws_APM_BACK/'+this.imageUrl
      } else {
       // this.servicio.showToast(res.mensaje);
      }
    });
  }
  

  async guardar() {
    if (
      this.txt_nameGroup &&
      this.txt_sportName &&
      this.txt_observations &&
      this.txt_date &&
      this.txt_sport_gender
    ) {
      const logoUrl = await this.subirLogo(); // Subir logo y obtener URL
      const imageUrl = await this.subirImagen(); // Subir imagen y obtener URL
  
      let datos = {
        accion: this.cod_group ? 'updateGroup' : 'insertGroup',
        SPG_CODE: this.cod_group,
        group_name: this.txt_nameGroup,
        rule_code: this.txt_sportName,
        godmother_code: this.grandmotherCode,
        pet_code: this.petCode,
        leader_code: this.cod,
        signature: imageUrl,
        logo: logoUrl,
        observations: this.txt_observations,
        creation_date: this.txt_date,
        gender_team: this.txt_sport_gender

      };
  
      // Enviar datos al servicio
      this.servicio.postData(datos).subscribe((res: any) => {
        if (res.estado === true) {
          this.servicio.showToast(res.mensaje);
          this.navCtrl.back();
        } else {
          this.servicio.showToast(res.mensaje);
        }
      }, (error) => {
        console.error('Error en la solicitud:', error);
      });
    } else {
      this.servicio.showToast('Por favor complete todos los campos.');
    }
  }

  // SELECCIONA EL LOGO DE LA EMPRESA
  seleccionarLogo(event: any) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      this.logo = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.logoUrl = reader.result as string; // Muestra la previsualización
      };
      reader.readAsDataURL(file);
    } else {
      this.servicio.showToast('Por favor, selecciona una imagen válida (PNG o JPEG).');
    }
  }

  // SELECCIONA UNA IMAGEN GENERAL DE LA EMPRESA
  seleccionarImagen(event: any) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      this.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string; // Muestra la previsualización
      };
      reader.readAsDataURL(file);
    } else {
      this.servicio.showToast('Por favor, selecciona una imagen válida (PNG o JPEG).');
    }
  }
  
 // SUBIR LOGO
 async subirLogo(): Promise<string> {
  if (!this.logo) {
    return this.logoUrl; // No hay logo para subir
  }
  const formData = new FormData();
  formData.append('logo', this.logo);

  try {
    const response = await fetch('http://localhost/APM_UCI/Ws_APM_BACK/upload.php', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (result.estado) {
      return result.archivo_url; // URL del logo en el servidor
    } else {
      this.servicio.showToast('Error al subir el logo');
      return ''; // Retorna vacío en caso de error
    }
  } catch (error) {
    console.error('Error al subir el logo:', error);
    this.servicio.showToast('Error al subir el logo');
    return ''; // Retorna vacío en caso de error
  }
}

// SUBIR IMAGEN
async subirImagen(): Promise<string> {
  if (!this.image) {
    return this.imageUrl; // No hay imagen para subir
  }
  const formData = new FormData();
  formData.append('imagen', this.image);

  try {
    const response = await fetch('http://localhost/APM_UCI/Ws_APM_BACK/upload.php', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (result.estado) {
      return result.archivo_url; // URL de la imagen en el servidor
    } else {
      this.servicio.showToast('Error al subir la imagen');
      return ''; // Retorna vacío en caso de error
    }
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    this.servicio.showToast('Error al subir la imagen');
    return ''; // Retorna vacío en caso de error
  }
}
  
}