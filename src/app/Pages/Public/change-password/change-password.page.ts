import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  clave : string ="";
  clave2 : string ="";
  mensaje : string ="";
  

  constructor() { }

  ngOnInit() {
  }
  vclave(){
    if(this.clave == this.clave2){
      this.mensaje = "";
    }else{
      this.mensaje = "Las claves no coinciden";
    }

  }
  changePassword(){
    
  }
  

}
