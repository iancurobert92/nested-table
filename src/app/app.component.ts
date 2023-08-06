import { Component, ContentChildren, QueryList, AfterContentInit, AfterViewInit, ViewChildren } from '@angular/core';
import { TableService } from './services';
import { NestedTableBodyRowDirective } from './nested-table/nested-table-body-row.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChildren(NestedTableBodyRowDirective)
  rows?: QueryList<NestedTableBodyRowDirective>;

  data$ = this.tableService.getData();

  constructor(private tableService: TableService) {}

  ngAfterViewInit(): void {
    this.initRowsState();
  }

  toggleRow(rootRow: NestedTableBodyRowDirective) {
    this.toggleRowsRecursively(rootRow);

    rootRow.toggle();
  }

  private toggleRowsRecursively(rootRow: NestedTableBodyRowDirective) {
    if (!this.rows) return;

    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows.get(i);

      if (row?.parent === rootRow) {
        if (row.parent.isExpanded) {
          row.hide();
        } else {
          row.show();
        }

        if (row.isExpanded) {
          this.toggleRow(row);
        }
      }
    }
  }

  private initRowsState() {
    if (!this.rows) return;

    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows.get(i);

      if (row?.parent) {
        row.hide();
      } else {
        row?.collapse();
      }
    }
  }
}
