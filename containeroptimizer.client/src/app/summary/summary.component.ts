import { Component, OnInit } from '@angular/core';
import { Upload } from '../upload/upload';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  uploads: Upload[] = [];
  blockA: Upload[] = [];
  blockB: Upload[] = [];
  blockC: Upload[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.uploads = nav?.extras.state?.['uploads'] || [];
    const third = Math.ceil(this.uploads.length / 3);
    this.blockA = this.uploads.slice(0, third);
    this.blockB = this.uploads.slice(third, 2 * third);
    this.blockC = this.uploads.slice(2 * third);
    this.updateBlockIdAndPositions();
  }



  drop(event: CdkDragDrop<Upload[]>) {
    if (event.container.data.length >= 3) {
      return;
    }
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateBlockIdAndPositions();
  }
  trackByFn(index: number, item: Upload) {
    return item.id;
  }
  updateBlockIdAndPositions() {
    this.blockA.forEach((item, index) => {
      item.blockId = 'A';
      item.stackPosition = index + 1;
    });
    this.blockB.forEach((item, index) => {
      item.blockId = 'B';
      item.stackPosition = index + 1;
    });
    this.blockC.forEach((item, index) => {
      item.blockId = 'C';
      item.stackPosition = index + 1;
    });
  }

}
