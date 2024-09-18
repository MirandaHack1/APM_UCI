import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-edit-rules',
  templateUrl: './edit-rules.page.html',
  styleUrls: ['./edit-rules.page.scss'],
})
export class EditRulesPage implements OnInit {

  nombreRegla: string = '';
  archivoReglas: File | null = null;
  archivoUrl: string = '';
  cod: string = '';
  codigoRegla: string = '';

  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) { 
    this.authService.getSession('USAD_CODE').then((res:any) => {
      this.cod = res;
    });

    this.authService.getSession('codigorules').then((res:any) => {
      this.codigoRegla = res;
      if (this.codigoRegla) {
        this.obtenerRegla();
      }
    });
  }

  ngOnInit() { }

  obtenerRegla() {
    let datos = {
      accion: 'reglasdatos', 
      id_regla: this.codigoRegla
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        let regla = res.datos[0]; 
        this.nombreRegla = regla.nombrer;
        this.archivoUrl = regla.pdf; // Asignar la URL del archivo PDF
      } else {
        this.authService.showToast('No se encontró la regla');
      }
    }, (error) => {
      console.error('Error en la solicitud:', error);
    });
  }

  seleccionarArchivo(event: any) {
    let file = event.target.files[0];
    if (file) {
      this.archivoReglas = file;
    }
  }

  async subirArchivo(): Promise<string> {
    if (!this.archivoReglas) {
      return this.archivoUrl; // Usa la URL existente si no hay nuevo archivo
    }
  
    const formData = new FormData();
    formData.append('archivo', this.archivoReglas);
  
    try {
      const response = await fetch('http://localhost/APM_UCI/Ws_APM_BACK/upload.php', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.estado) {
        return result.archivo_url; // URL del archivo en el servidor
      } else {
        this.authService.showToast('Error al subir el archivo');
        return this.archivoUrl; // Retorna la URL existente en caso de error
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      this.authService.showToast('Error al subir el archivo');
      return this.archivoUrl; // Retorna la URL existente en caso de error
    }
  }
  
  async guardarRegla() {
    const archivoUrl = await this.subirArchivo();
  
    let datos = {
      accion: this.codigoRegla ? 'ActualizarRegla' : 'AgregarRegla',
      id_regla: this.codigoRegla || '',
      nombre_regla: this.nombreRegla,
      usuario_codigo: this.cod,
      archivo_url: archivoUrl // Aquí colocas la URL del archivo
    };
  
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast(this.codigoRegla ? 'Regla actualizada correctamente' : 'Regla guardada correctamente');
        this.navCtrl.back();
      } else {
        this.authService.showToast(res.mensaje);
      }
    }, (error) => {
      console.error('Error en la solicitud:', error);
    });
  }
  

  cancelar() {
    this.navCtrl.back();
  }
}
