import { Component, OnInit } from '@angular/core';
import { FrameService } from '../services/frame.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-app-reader',
  templateUrl: './app-reader.component.html',
  styleUrls: ['./app-reader.component.css']
})
export class AppReaderComponent implements OnInit {
  contentHtml: any;
  websiteName = '';
  element: any;
  tableId: any;

  constructor(private frameservice: FrameService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.TS_GetFrameDetails();
  }

  TS_GetFrameDetails() {
    this.frameservice.getByWebSite(this.route.snapshot.params['id']).subscribe({
      next: (res: any) => {
        let frame: any;
        let html = '';
        for (let i = 0; i < res.length; i++) {
          html += `
            <div class="frame route-${res[i].key}" style="display:none;">
              ${res[i].content}
            </div>
          `;
          if (res[i].route === '') {
            frame = res[i];
          }
        }
        this.contentHtml = this.sanitizer.bypassSecurityTrustHtml(html);
        setTimeout(() => {
          this.element = document.querySelector('.route-' + frame.key) as HTMLElement;
          console.log(this.element);
          if (this.element) {
            this.element.style.display = 'block';
            this.TS_ActiveNavbarButtons();
            this.TS_ActiveButtons();
          } else {
            console.error('Element with the specified key not found');
          }
        }, 1000);
        if (frame && frame.event) {
          try {
            eval(frame.event);
          } catch (error) {
            console.error('Error executing frame event:', error);
          }
        }
      },
      error: (err) => console.error('Error fetching frame details:', err)
    });
  }

  TS_ActiveNavbarButtons() {
    const navBarButtons = document.querySelectorAll('.nav-bar-btn');
    console.log('Nav-bar buttons:', navBarButtons);
    navBarButtons.forEach((button: Element) => {
      button.addEventListener('click', () => {
        const frames = document.querySelectorAll('.frame');
        frames.forEach((frame: Element) => {
          (frame as HTMLElement).style.display = 'none';
        });

        const navid = button.getAttribute('navid');
        console.log('Clicked navid:', navid);

        const frm = document.querySelector('.route-' + navid) as HTMLElement;
        if (frm) {
          frm.style.display = 'block';
        } else {
          console.error('Frame with specified navid not found');
        }
      });
    });
  }

  TS_ActiveButtons() {
    const btnExcelElements = document.querySelectorAll('.btnexcel');
    console.log('Excel buttons:', btnExcelElements);
    btnExcelElements.forEach((button: Element) => {
      button.addEventListener('click', () => {
        this.tableId = button.id.split('-')[0];
        if (button.id.split('-')[1] === 'export') {
          this.TS_ExportExcel();
        }
      });
    });
  }

  TS_ExportExcel() {
    const table = document.querySelector('#' + this.tableId) as HTMLElement;
    if (table) {
      const colTable = table.childNodes[0].childNodes[0].childNodes;
      const rowTable = table.childNodes[1].childNodes;
      const dataForXL = [];
      const cols: any = [];
      for (let i = 0; i < colTable.length; i++) {
        if ((colTable[i] as HTMLElement).innerText !== '') {
          cols.push((colTable[i] as HTMLElement).innerText);
        }
      }
      let indexCols = 0;
      for (let j = 0; j < rowTable.length; j++) {
        const row = rowTable[j].childNodes;
        const rw: any = {};
        for (let i = 1; i < row.length; i++) {
          rw[cols[indexCols]] = (row[i] as HTMLElement).childNodes[0].nodeValue;
          if (indexCols < cols.length - 1) {
            indexCols++;
          } else {
            indexCols = 0;
          }
        }
        dataForXL.push(rw);
      }
      this.TS_ExportToCSV('mytest', dataForXL);
    } else {
      console.error('Table with specified id not found');
    }
  }

  TS_ExportToCSV(fileName: any, data: any) {
    const csvData = this.TS_ConvertDataToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  TS_ConvertDataToCSV(data: any) {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map((entry: any) => Object.values(entry).join(',')).join('\n');
    return header + '\n' + rows;
  }

 
}
