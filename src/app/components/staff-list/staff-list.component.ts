
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonApiService } from '../../JsonApiService.service'

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffList implements OnInit {
  // @Input() data: any;

  showModal = false;
  toggleModal = () => {
    this.showModal = !this.showModal;
  }
  datos: any =''
  //variable que se va a ir al componente padre
  @Output() cambio = new EventEmitter<any>();
  cambiar() {
    // this.datos = 'austin12gmail.com'
    this.cambio.emit('austin12gmail.com')
 
  }


  data: any; // varialbe data almacena array de los meseros
  url: string = 'http://localhost:3000/users#'
  constructor(public json: JsonApiService, private route: ActivatedRoute) {
    this.cambiar()
    console.log('aqui'); 

  }
  newPerson: any = {
    "id": "848",
    "email": "carlos@gmail.com",
    "roles": {
      "admin": false
    },
    "photo": "string.png",
    "name": " Garcia",
    "dateBirth": "04/10/1996",
    "cellphone": "944444444"
  }
  id = "2"
  findEmployer = (employer: any): any => employer.roles.admin === false//funcion para obtener no admnistrador

  addEmployed() {
    this.json.postEmployed(this.url, this.newPerson).subscribe((response: any) => {
      this.data.push(response)
    });
  }

  lessEmployed(): void {
    this.json.deleteEmployed('http://localhost:3000/users#', this.id).subscribe((response: any) => {
      console.log(this.id);

    });
    this.data = this.data.filter(e => e.id !== this.id)
  }

  ngOnInit(): void {
    this.json.getEmployed(this.url).subscribe((response: any) => {
      this.data = response.filter(this.findEmployer)
      console.log(this.data + 'desde card')
    })
    let id = +this.route.snapshot.paramMap.get('id');

  }


}
