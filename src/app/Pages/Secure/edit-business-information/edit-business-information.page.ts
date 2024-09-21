import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-edit-business-information',
  templateUrl: './edit-business-information.page.html',
  styleUrls: ['./edit-business-information.page.scss'],
})
export class EditBusinessInformationPage implements OnInit {
  codigo: string = '';
  txt: string = '';

  // DECLARANDO VARIABLES DE EMPRESA
  nombre: string = '';
  logo: File | null = null; // Almacenar el archivo del logo
  mision: string = '';
  vision: string = '';
  image: File | null = null; // Almacenar el archivo de la imagen
  estado: string = '';
  contacto: string = '';

  // DECLARANDO CAMPOS DE ARCHIVOS Y URLS
  logoUrl: string = ''; // Para previsualización del logo
  imageUrl: string = ''; // Para previsualización de la imagen

  constructor(public navCtrl: NavController, public servicio: AuthService) {
    this.servicio.getSession('codigo').then((res: any) => {
      this.codigo = res;
      if (this.codigo) {
        this.obtenerEmpresa();
      }
    });
  }

  ngOnInit() {}

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


  obtenerEmpresa() {
    let datos = {
        accion: 'empresasdatos',
        codigo: this.codigo,
    };
    this.servicio.postData(datos).subscribe(
        (res: any) => {
            if (res.estado === true) {
                let empresa = res.datos[0];
                this.nombre = empresa.nombre;
                this.logoUrl = empresa.logo.replace(/\\/g, '');
                this.mision = empresa.mision;
                this.vision = empresa.vision;
                // this.imageUrl = empresa.image;
                this.imageUrl = empresa.image.replace(/\\/g, '');

                this.estado = empresa.estado;
                this.contacto = empresa.contacto;

                //console.log(this.imageUrl);
            } else {
                this.servicio.showToast('No se encontró la empresa');
            }
        },
        (error) => {
            console.error('Error en la solicitud:', error);
        }
    );
}


 // MÉTODO PARA GUARDAR O ACTUALIZAR LOS DATOS
async guardar() {
  if (
    this.nombre &&
    this.mision &&
    this.vision &&
    this.estado &&
    this.contacto
  ) {
    const logoUrl = await this.subirLogo(); // Subir logo y obtener URL
    const imageUrl = await this.subirImagen(); // Subir imagen y obtener URL

    let datos = {
      accion: this.codigo ? 'actualizarEmpresa' : 'insertarEmpresa',
      nombre: this.nombre,
      logo: logoUrl, // URL del logo
      mision: this.mision,
      image: imageUrl, // URL de la imagen
      vision: this.vision,
      estado: this.estado,
      contacto: this.contacto,
      codigo: this.codigo,
      // usuarioInsertar: 'usuario_actual' // Si decides incluirlo más tarde
    };
    console.log(datos);

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


  // REGRESAR AL FORMULARIO EMPRESA
  back() {
    this.navCtrl.back();
  }
}
