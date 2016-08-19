import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../shared/global.service';
import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable } from 'angularfire2';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


@Component({
  moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
  directives: [ ROUTER_DIRECTIVES, MODAL_DIRECTIVES ]
})

export class SidebarComponent implements OnInit {
  defaultImg = 'http://cdn.bleedingcool.net/wp-content/uploads/2012/09/sam-bain-twitter-avatar.jpeg';
  width: number;
  userData: FirebaseObjectObservable<any>;
  signOutShowed = false;
  unread: FirebaseObjectObservable<any>;

  @ViewChild('modal')
    modal: ModalComponent;

  constructor(private _elRef: ElementRef, public af: AngularFire, private router:Router, private route: ActivatedRoute, private globalService: GlobalService) {
    this.width = window.innerWidth;
    var url = '/private/'+localStorage.getItem('uid');
    this.userData = af.database.object(url);
    af.database.object(url).subscribe(num => {
      this.unread = num.unread;
      console.log(this.unread);
    });
    af.database.object(url).subscribe(item => {
      if (!item.username) {
        this.af.database.object(url).update({
          username: "New User",
          imgUrl: this.defaultImg,
          uid: localStorage.getItem('uid')
        });
      }
    });
    af.database.object(url).subscribe(item => {
      globalService.username = item.username;
    });
  }

  ngOnInit():any {
    window.onresize = () => {
      this.width = window.innerWidth;
      this.globalService.width = window.innerWidth;
    }
  }

  onSignOut() {
    this.af.auth.logout();
    localStorage.setItem('uid', '');
    console.log('navigate');
    this.router.navigate(['/login']);
  }

  onToggle() {
    this.globalService.toggle = !this.globalService.toggle;
  }

  onNav() {
    this.globalService.navClicked = !this.globalService.navClicked;
  }

  changeProfile(newuser: string, newimg: string) {
    if (newuser!='') {
      this.globalService.username = newuser;
      this.af.database.object('/private/'+localStorage.getItem('uid')).update({ username: newuser });
    }
    if (newimg!='') {
      this.af.database.object('/private/'+localStorage.getItem('uid')).update({ imgUrl: newimg });
      this.globalService.imgUrl = newimg;
    }
    this.modal.close();
  }

  onClickSignOut() {
    this.signOutShowed = !this.signOutShowed;
  }

  navRoute(addr: string) {
    this.router.navigate([addr]);
  }

}
