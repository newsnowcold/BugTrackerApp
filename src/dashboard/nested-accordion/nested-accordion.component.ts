import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nested-accordion',
  templateUrl: './nested-accordion.component.html',
  styleUrls: ['./nested-accordion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NestedAccordionComponent implements OnInit {
  @Input() data: any;
  @Input() statusTypeFilter: any;
  @Input() priorityTypeFilter: any;

  @Output() updateStatus: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateTicket: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeTicket: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  openUpdateStatusModal = function (bug) {
    this.updateStatus.emit(bug);
  }

  openUpdateTicketModel = function (bug) {
    this.updateTicket.emit(bug);
  }

  openRemoveTicketModel = function (bug) {
    this.removeTicket.emit(bug);
  }

}
