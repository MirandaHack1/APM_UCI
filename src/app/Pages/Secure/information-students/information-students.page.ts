import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information-students',
  templateUrl: './information-students.page.html',
  styleUrls: ['./information-students.page.scss'],
})
export class InformationStudentsPage implements OnInit {
  ICLI_CARD: string = "";
ICLI_FIRST_NAME: string = "";
ICLI_LAST_NAME: string = "";
ICLI_PHONE_NUMBER: string = "";
ICLI_ADDRESS: string = "";
ICLI_CITY: string = "";
ICLI_PROVINCE: string = "";
ICLI_CAREER: string = "";
ICLI_SEMESTER: string = "";
ICLI_AGE: string = "";
ICLI_GENDER: string = "";
ICLI_WEIGHT: string = "";
ICLI_HEIGHT: string = "";
ICLI_INSTITUTIONAL_EMAIL: string = "";
ICLI_DATE_OF_BIRTH: string = "";
USAD_USERNAME: string = "";
USAD_EMAIL: string = "";
USAD_PASSWORD: string = "";
USAD_EMAIL_RECOVERY: string = "";
USAD_CODE: string = "";

  constructor() { }

  ngOnInit() {
  }

}
