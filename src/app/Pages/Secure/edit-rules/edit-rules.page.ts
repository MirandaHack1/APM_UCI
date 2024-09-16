import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
AuthService

@Component({
  selector: 'app-edit-rules',
  templateUrl: './edit-rules.page.html',
  styleUrls: ['./edit-rules.page.scss'],
})
export class EditRulesPage implements OnInit {

  nombreRegla: string = '';
  archivoReglas: File | null = null;
  fechaEnvio: string = '';
  usuarioCodigo: string = '';
  codigoRegla: string = ''; // Para editar una regla existente

  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    // Puedes inicializar algo si es necesario
    this.obtenerRegla(); // Llamar a la función para traer la información de la regla si es una edición
  }

  obtenerRegla() {
    // Aquí puedes obtener los detalles de la regla si estás editando una existente
    let datos = {
      accion: 'Conregla', 
      id_regla: this.codigoRegla // Asumes que este valor se pasa a través de una sesión o parámetro
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        let regla = res.datos[0]; // Asumiendo que res.datos devuelve un array
        this.nombreRegla = regla.RU_RULES_FOR_SPORTS;
        this.fechaEnvio = regla.RU_DATE;
        this.usuarioCodigo = regla.USAD_CODE;
      } else {
        this.authService.showToast('No se encontró la regla');
      }
    }, (error) => {
      console.error('Error en la solicitud:', error);
    });
  }

  seleccionarArchivo(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoReglas = file;
    }
  }

  guardarRegla() {
    // Verificamos que todos los campos necesarios estén completos
    if (!this.nombreRegla || !this.fechaEnvio || !this.usuarioCodigo || !this.archivoReglas) {
      this.authService.showToast('Por favor completa todos los campos y selecciona un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('accion', 'GuardarRegla');
    formData.append('nombre', this.nombreRegla);
    formData.append('fecha', this.fechaEnvio);
    formData.append('usuario_codigo', this.usuarioCodigo);
    formData.append('archivo', this.archivoReglas);

    this.authService.postData(formData).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Regla guardada exitosamente');
        this.navCtrl.navigateRoot(['lista-reglas']); // Asume que tienes una página donde listan las reglas
      } else {
        this.authService.showToast('Error al guardar la regla');
      }
    }, (error) => {
      console.error('Error en la solicitud:', error);
    });
  }

  cancelar() {
    this.navCtrl.back(); // Vuelve a la página anterior
  }
}
