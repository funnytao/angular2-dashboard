import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GlobalService } from '../shared/global.service';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css'],
  directives: [ SidebarComponent, ROUTER_DIRECTIVES ],
})
export class PageComponent {
  constructor(private globalService: GlobalService) {}
}
