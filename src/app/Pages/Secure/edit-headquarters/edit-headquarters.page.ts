import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
@Component({
  selector: 'app-edit-headquarters',
  templateUrl: './edit-headquarters.page.html',
  styleUrls: ['./edit-headquarters.page.scss'],
})
export class EditHeadquartersPage implements OnInit {
  // DELCARANDO VARIABLES DE EMPRESA
  businessInfo: any = [];
  empresa: string = '';

  //DECLARANDO VARIABLES DE LAS SEDES
  sede: any = [];
  codigo: string = '';
  txt: string = '';
  direccion: string = '';
  ciudad: string = '';
  pais: string = '';
  telefono: string = '';
  estado: string = '';

  //AUDITORIA
  USER_INSERT: string = '';
  USER_UPDATE: string = '';
  USER_DELETE: string = '';
  INSERT_DATE: string = '';
  UPDATE_DATE: string = '';
  DELETE_DATE: string = '';
  constructor(public navCtrl: NavController, public servicio: AuthService) {
    //LLAMO LAS FUNCIONES PARA CARGE EL SELECT

    // OBTENER EL CÓDIGO DE LA SESIÓN
    this.servicio.getSession('codigo').then((res: any) => {
      this.codigo = res;
      if (this.codigo) {
        this.cargarSede();
      }
    });
  }

  ngOnInit() {
    this.loadbusinessinfo();
  }

  //CARGAR SEDES UNO
  cargarSede() {
    let datos = {
      accion: 'dsedes',
      codigo: this.codigo,
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.sede = res.info[0];
        this.direccion = this.sede.direccion;
        this.ciudad = this.sede.ciudad;
        this.pais = this.sede.pais;
        this.telefono = this.sede.telefono;
        this.estado = this.sede.estado;

        // Asignar los IDs del cliente y del producto
        this.empresa = this.sede.empresa; // Cambia a ID del cliente
        // this.od_prod_id = this.order.prod_id; // Cambia a ID del producto

        // Agregar estos console.logs para verificar los datos
        console.log('Cliente ID:', this.empresa);
        // console.log('Producto ID:', this.od_prod_id);
      } else {
        this.servicio.showToast(res.mensaje, true);
      }
    });
  }

  //OBTENER LA INFORMACION DE LAS businessInfo
  obtenerEmpresa() {
    let datos = {
      accion: 'consultarEmpresa',
    };
    this.servicio.postData(datos).subscribe(
      (res: any) => {
        console.log(res); // Agrega este log para ver la respuesta
        if (res.estado === true) {
          this.businessInfo = res.datos;
        } else {
          this.servicio.showToast(res.mensaje, true);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  guardar() {
    if (
      //ENVIO EL CODIGO DEL ID DE EMPRESA
      this.empresa &&
      //ENVIOS LOS CAMPOS DE SEDES
      this.direccion &&
      this.ciudad &&
      this.pais &&
      this.telefono &&
      this.estado
    ) {
      const accion = this.codigo ? 'actualizar_sede' : 'insertar_sede';
      let datos = {
        accion: accion,
        codigo: this.codigo,
        direccion: this.direccion,
        ciudad: this.ciudad,
        pais: this.pais,
        telefono: this.telefono,
        estado: this.estado,
        empresa: this.empresa,
      };
      console.log(datos);
      // Enviar datos al servicio
      this.servicio.postData(datos).subscribe((res: any) => {
        if (res.estado === true) {
          this.servicio.showToast(res.mensaje);
          this.navCtrl.back();
        } else {
          this.servicio.showToast(res.mensaje, true);
        }
      });
    } else {
      this.servicio.showToast('Por favor complete todos los campos.', true);
    }
  }

  //CARGA LA EMPRESA
  loadbusinessinfo() {
    let datos = {
      accion: 'loadbusinessinfo2',
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.businessInfo = res.datos; // Guarda los datos de las sedes
        //this.servicio.showToast(res.mensaje);
      } else {
        this.servicio.showToast(res.mensaje, true);
      }
    });
  }

  // REGRESAR AL FORMULARIO EMPRESA
  back() {
    this.navCtrl.back();
  }
}
