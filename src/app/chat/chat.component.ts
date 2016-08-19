import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/global.service';
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private globalService: GlobalService) {}

  ngOnInit() {
  }

}
