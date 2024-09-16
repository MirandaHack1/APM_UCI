import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-edit-user-rol',
  templateUrl: './edit-user-rol.page.html',
  styleUrls: ['./edit-user-rol.page.scss'],
})
export class EditUserRolPage implements OnInit {
  nombre: string="";
  rol:string="";
  codigo: string = "";
  usuario: any = {};
  
  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) {
    this.authService.getSession('codigo').then((res:any)=>{
      this.codigo=res;
      //this.txt=this.codigousu;
      if(this.codigo){
        this.cargarDatosUsuario();
      }
    });
   }

 
  ngOnInit() {
  
  }

  cargarDatosUsuario() {
    let datos = {
      accion: 'consultausuarioDATOS',
      codigo: this.codigo
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.usuario = res.datos[0];
        this.rol = this.usuario.rol;       
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }
  

 guardarCambios() {
    let datos = {
      accion: 'editarusuario',
      codigo: this.codigo, 
      rol: this.rol 
    };

    console.log(datos); // Verifica que los datos sean correctos

    this.authService.postData(datos).subscribe((res: any) => {
      console.log(res);
      if (res.estado === true) {
        this.authService.showToast('Usuario actualizado correctamente');
        this.navCtrl.back();
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }
  cancelar(){
    this.navCtrl.back();
  }
}
