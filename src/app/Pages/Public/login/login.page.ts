import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit() {}
  login() {
    // Aquí puedes agregar la lógica de autenticación
    console.log('Intento de inicio de sesión');
  }
}
