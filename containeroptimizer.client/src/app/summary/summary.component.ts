import { Component } from '@angular/core';
import { Upload } from '../upload/upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  uploads: Upload[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.uploads = nav?.extras.state?.['uploads'] || [];
  }
}
