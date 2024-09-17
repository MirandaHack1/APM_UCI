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
  cod: string = '';
  usuarioCodigo: string = '';
  codigoRegla: string = ''; // Para editar una regla existente

  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) 
  { 
    this.authService.getSession('USAD_CODE').then((res:any) => {
      this.cod = res;
      this.guardarRegla();  
      console.log( this.cod);
    });
    this.authService.getSession('codigorules').then((res:any)=>{
      this.codigoRegla=res;
      //this.txt=this.codigousu;
      if(this.codigoRegla){
        this.guardarRegla();
        this.obtenerRegla();
      }
    });
  }
  ngOnInit() {
  }

  obtenerRegla() {
    let datos = {
      accion: 'reglasdatos', 
      id_regla: this.codigoRegla
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        let regla = res.datos[0]; 
        this.nombreRegla = regla.nombrer;
        //this.usuarioCodigo = regla.USAD_CODE;
      } else {
        this.authService.showToast('No se encontró la regla');
      }
    }, (error) => {
      console.error('Error en la solicitud:', error);
    });
  }


  guardarRegla() {
    let datos = {
      accion: this.codigoRegla ? 'ActualizarRegla' : 'AgregarRegla',
      id_regla: this.codigoRegla || '', 
      nombre_regla: this.nombreRegla, 
      usuario_codigo: this.cod, 
      archivo: this.archivoReglas  
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
