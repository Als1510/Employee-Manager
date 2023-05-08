import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {
  @Input() employees;
  @Output() deleteEmployee: EventEmitter<any> = new EventEmitter();
  @Output() editEmployee: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  delete(item) {
    this.deleteEmployee.emit(item)
  }
  
  edit(item) {
    this.editEmployee.emit(item)
  }
}
