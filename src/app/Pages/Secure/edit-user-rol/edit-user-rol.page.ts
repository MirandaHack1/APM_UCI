import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Router } from '@angular/router'; // Importa el Router
@Component({
  selector: 'app-edit-user-rol',
  templateUrl: './edit-user-rol.page.html',
  styleUrls: ['./edit-user-rol.page.scss'],
})
export class EditUserRolPage implements OnInit {
  nombre: string="";
  rol:string="";
  codigousu: string = "";
  usuario: any = {};
 
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

 
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const codigousu = params['codigousu'];
      this.codigousu = codigousu; // Guarda el código de usuario en la propiedad de la clase
      this.cargarDatosUsuario(codigousu);
      console.log('Código del usuario recibido:', codigousu);
    });
  }

  cargarDatosUsuario(codigousu: string) {
    let datos = {
      accion: 'consultausuarioDATOS',
      codigousu: codigousu,
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.usuario = res.datos[0];
        this.nombre = this.usuario.nombre; 
        this.rol = this.usuario.rol;       
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }
  

 guardarCambios() {
    let datos = {
      accion: 'editarusuario',
      codigo: this.codigousu, // Usa el código almacenado en la clase
      nombre: this.nombre, // Datos del formulario
      rol: this.rol // Datos del formulario
    };

    console.log(datos); // Verifica que los datos sean correctos

    this.authService.postData(datos).subscribe((res: any) => {
      console.log(res);
      if (res.estado === true) {
        this.authService.showToast('Usuario actualizado correctamente');
        this.router.navigate(['/user-rol']);
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }
  cancelar(){
    this.router.navigate(['/user-rol']);
  }
}
