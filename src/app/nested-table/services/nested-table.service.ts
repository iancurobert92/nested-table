import { Injectable, QueryList } from '@angular/core';
import { NestedTableBodyRowDirective } from '../directives/nested-table-body-row.directive';

@Injectable({
  providedIn: 'root',
})
export class NestedTableService {
  get rows(): QueryList<NestedTableBodyRowDirective> | undefined {
    return this._rows;
  }

  get totalRows(): number {
    return this._rows?.length ?? 0;
  }

  private _rows?: QueryList<NestedTableBodyRowDirective>;

  constructor() {}

  setRows(rows: QueryList<NestedTableBodyRowDirective>) {
    this._rows = rows;
  }

  collapseAll() {
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

  toggleRow(rootRow: NestedTableBodyRowDirective) {
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

    rootRow.toggle();
  }
}
