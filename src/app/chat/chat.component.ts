import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/global.service';
<<<<<<< HEAD
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { KeysPipe } from './friend.pipe';
import { RecentChatPipe } from './recentChat.pipe';
import { OrderBy } from './sort.pipe';
=======
>>>>>>> ef350b95d65b9ad28f7f91bb006de25ee747b507
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
<<<<<<< HEAD
  styleUrls: ['chat.component.css'],
  pipes: [KeysPipe, RecentChatPipe, OrderBy]
})
export class ChatComponent implements OnInit {

  menu = "Friends";
  user_list = [];
  friend_list = {};
  receiver = [];
  chat_id = '';
  message_list = [];
  messageText = '';
  user_id = '';
  unread = 0;

  constructor(private globalService: GlobalService, public af: AngularFire) {
    af.database.object('private/'+localStorage.getItem('uid')).update({unread: 0});
    af.database.list('/private').subscribe(list => {
      this.user_list = list;
    });
    af.database.object('/private/'+localStorage.getItem('uid')).subscribe(user => {
      this.friend_list = user.friend_list || {};
      console.log(this.friend_list);
    });
    this.user_id = localStorage.getItem('uid');
  }
=======
  styleUrls: ['chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private globalService: GlobalService) {}
>>>>>>> ef350b95d65b9ad28f7f91bb006de25ee747b507

  ngOnInit() {
  }

<<<<<<< HEAD
  friendExist(value) {
    return !this.friend_list[value];
  }

  toggleFriend(value) {
    if (!this.friend_list[value.uid]) {
      this.friend_list[value.uid] = {
        username: value.username,
        imgUrl: value.imgUrl,
        uid: value.uid
      };
    }
    else {
      delete this.friend_list[value.uid];
    }
    console.log(this.friend_list);
    this.af.database.object('/private/'+localStorage.getItem('uid')).update({
      friend_list: this.friend_list
    });
  }

  showDialog(value) {
    this.receiver = this.friend_list[value];
    // console.log(this.receiver['uid']);
    this.chat_id = this.receiver['uid']>localStorage.getItem('uid') ? localStorage.getItem('uid')+this.receiver['uid'] : this.receiver['uid']+localStorage.getItem('uid');
    this.af.database.object('shared/chat/'+this.chat_id).subscribe(chat => {
      this.message_list = chat;
      console.log(chat);
    });
    this.af.database.object('private/'+this.receiver['uid']).subscribe(num => {
      this.unread = num.unread || this.unread;
    });
  }

  dateModifier(time) {
    var newDate = new Date(time);
    var curDate = new Date(Date.now());
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var hour = newDate.getHours()<10?'0'+newDate.getHours():''+newDate.getHours();
    var minute = newDate.getMinutes()<10?'0'+newDate.getMinutes():''+newDate.getMinutes();
    if (newDate.getDate()!=curDate.getDate()) {
      return months[newDate.getMonth()]+' '+newDate.getDate()+', '+hour+":"+minute;
    }
    else return hour+":"+minute;
  }

  trimText(text) {
    if (!text) return;
    return text.length<21 ? text : text.substring(0, 20)+'...';
  }

  sendMessage() {
    if (!this.messageText || this.messageText.length==0) return;
    var  message = {
      name: this.globalService.username,
      date: Date.now(),
      text: this.messageText,
      imgUrl: this.globalService.imgUrl
    };
    if (!this.message_list.length) {
      this.af.database.object('shared/chat/'+this.chat_id+'/0').update(message);
    }
    else {
      this.af.database.object('shared/chat/'+this.chat_id+'/'+this.message_list.length).update(message);
    }
    this.unread = this.unread + 1;
    this.af.database.object('private/'+this.receiver['uid']).update({unread: this.unread});
    this.af.database.object('private/'+this.receiver['uid']+'/friend_list/'+localStorage.getItem('uid')).update({
      imgUrl: this.globalService.imgUrl,
      username: this.globalService.username,
      uid: localStorage.getItem('uid'),
      lastText: this.messageText,
      updateTime: Date.now()
    });
    this.af.database.object('private/'+localStorage.getItem('uid')+'/friend_list/'+this.receiver['uid']).update({
      lastText: this.messageText,
      updateTime: Date.now()
    });

    this.messageText = '';
    // console.log(this.message_list.length);
  }

=======
>>>>>>> ef350b95d65b9ad28f7f91bb006de25ee747b507
}
