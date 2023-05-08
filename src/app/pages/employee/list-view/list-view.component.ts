import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  @Input() employees;
  @Output() deleteEmployee: EventEmitter<any> = new EventEmitter();
  @Output() editEmployee: EventEmitter<any> = new EventEmitter();
  dataSource: MatTableDataSource<any> = null;
  displayedColumns: string [] = ['name', 'position', 'about', 'date', 'actions']

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.datSourceStateHandler()
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    this.datSourceStateHandler()
  }

  datSourceStateHandler(): void {
    if (this.dataSource) {
        this.dataSource.data = this.employees;
    } else {
      this.dataSource = new MatTableDataSource(this.employees);
    }
  }

  delete(item) {
    this.deleteEmployee.emit(item)
  }
  
  edit(item) {
    this.editEmployee.emit(item)
  }
}