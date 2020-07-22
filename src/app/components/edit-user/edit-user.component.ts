import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUser implements OnInit {
  @Input() closeCallback = () => (false);

  constructor() { }

  ngOnInit(): void {
  }

}
