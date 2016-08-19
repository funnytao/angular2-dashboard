import { Component, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { GlobalService } from '../shared/global.service';
import { CustomerChartComponent } from '../customer-chart/customer-chart.component';
import { IssueChartComponent } from '../issue-chart/issue-chart.component';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UploadComponent } from '../upload/upload.component';
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [ CustomerChartComponent, IssueChartComponent, UploadComponent, MODAL_DIRECTIVES, ModalComponent ],
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('upload')
    modal: ModalComponent;

  target = '';
  item: FirebaseListObservable<any>;
  toggle: boolean;
  uploadError = "";
  emptyFile = true;

  constructor(public af: AngularFire, private _elRef: ElementRef, private globalService: GlobalService, private router: Router) {
    if (localStorage.getItem('uid')=='null' || localStorage.getItem('uid')=='') {
      localStorage.setItem('uid', '');
      this.router.navigate(['/login']);
      console.log('redirectd');
    }

    this.item = af.database.list('shared/employeeMap');
  }

  renderMap(item:any) {
    var mapData = item;
    delete mapData.$key;
    jQuery('#world-map').empty();
    jQuery('#world-map').vectorMap({
      map: 'world_mill',
      backgroundColor: '#fff',
      regionStyle: { initial: { fill: '#000000' } },
      series: {
        regions: [{
          values: item,
          scale: ['#00a6f1', '#003c58'],
          normalizeFunction: 'polynomial',
          attribute: 'fill',
        }]
      },
      onRegionTipShow: function(e, el, code){
        el.html(el.html()+' (Employee - '+item[code]+')');
      }
    });
  }

  prepareUpload(text) {
    this.target = text;
    this.emptyFile = true;
    this.modal.open();
  }

  onUpload(file) {
    this.uploadError = "";
    var myFile = jQuery(file)[0].files[0];
    var tmp = myFile.name.split('.');
    // console.log(tmp[tmp.length-1]);
    if (tmp[tmp.length-1]!='csv') {
      this.uploadError = "Format must be .CSV";
      return;
    }
    this.emptyFile = false;
    var reader = new FileReader();
    reader.readAsBinaryString(myFile);
    reader.onload = this.loadHandler;
  }

  loadHandler(event) {
    var csv = event.target.result;
    document.getElementById('out').innerHTML = csv;
  }

  uploadFire() {
    var csv = document.getElementById('out').innerHTML;
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = {};
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        // console.log(data);
        if (data[0]!="") {
          lines[data[0]] = Number(data[1]);
        }
    }
    // console.log(lines);
    if (this.target!='') {
      switch(this.target) {
        case 'customerChart':
          this.af.database.object('/shared').update({customerChart: lines});
          break;
        case 'employeeMap':
          this.af.database.object('/shared').update({employeeMap: lines});
          break;
        case 'issueChart':
          this.af.database.object('/shared').update({issueChart: lines});
          break;
        default:
          break;
      }
    }
    this.eraseUpload();
  }

  eraseUpload() {
    jQuery('#fileinput').val('');
    jQuery('div.ezdz-dropzone').removeClass('ezdz-accept');
    jQuery('div.ezdz-dropzone').find('div').first().text('Drop a file');
  }

  ngAfterViewInit():any {
    this.af.database.object('shared/employeeMap').subscribe(item=> {
      this.renderMap(item);
    });
    jQuery('input[type="file"]').ezdz();
    var clock = jQuery('.your-clock').FlipClock({});
    var currentTime = (new Date().getHours()*60+new Date().getMinutes())*60+new Date().getSeconds();
    clock.setTime(currentTime);
  }

}
