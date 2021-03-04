import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { SidebarItem } from 'src/app/store/sidebar/sidebar-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  @Input() title;
  @Input() items = [];
  @Input() selected;

  @Output() clicked = new EventEmitter<SidebarItem>();

  isSidebarSticky = false;

  // Needed to make sidebar sticky based on navbar height
  navbarHeightRem = 4;
  remUnitPx = 14;

  isMobile = window.orientation > -1;

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(item: SidebarItem) {
    this.clicked.emit(item);
  }

  originalOrder(a, b) {
    return 0;
  }
}
