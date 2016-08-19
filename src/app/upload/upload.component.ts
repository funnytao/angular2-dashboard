import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import { GlobalService } from '../shared/global.service';
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css'],
})
export class UploadComponent implements OnInit {

  item: FirebaseObjectObservable<any>;
  lines = {};
  constructor(public af: AngularFire, private globalService: GlobalService) {
    this.item = af.database.object('/shared');
  }

  ngOnInit() {
    jQuery('input[type="file"]').ezdz();
  }


  onUpload(file) {
    var myFile = jQuery(file)[0].files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(myFile);
    reader.onload = this.loadHandler;
  }

  loadHandler(event) {
    var csv = event.target.result;
    document.getElementById('out').innerHTML = csv;
  }

  uploadFire() {
    var csv = document.getElementById('out').innerHTML
    var allTextLines = csv.split(/\r\n|\n/);
    this.lines = {};
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        // console.log(data);
        if (data[0]!="") {
          this.lines[data[0]] = Number(data[1]);
        }
    }
    console.log(this.lines);
    this.item.update({test: this.lines});
  }

}
