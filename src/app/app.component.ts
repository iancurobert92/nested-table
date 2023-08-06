import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  ViewChild,
} from '@angular/core';
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

  @ViewChild('headerRowCheckbox')
  headerRowCheckbox?: ElementRef<HTMLInputElement>;

  @ViewChildren('bodyRowCheckbox')
  bodyRowCheckboxes?: QueryList<ElementRef<HTMLInputElement>>;

  data$ = this.tableService.getData();

  constructor(private tableService: TableService) {}

  ngAfterViewInit(): void {
    this.initRowsState();
  }

  toggleRow(rootRow: NestedTableBodyRowDirective) {
    this.toggleRowsRecursively(rootRow);

    rootRow.toggle();
  }

  onHeaderCheckboxValueChange() {
    if (!this.headerRowCheckbox) return;

    const checkbox = this.headerRowCheckbox.nativeElement;

    this.bodyRowCheckboxes?.forEach((bodyCheckbox) => {
      bodyCheckbox.nativeElement.checked = checkbox.checked;
    });
  }

  onBodyRowCheckboxValueChange(bodyRow: NestedTableBodyRowDirective) {
    const bodyRowCheckboxesValues = this.bodyRowCheckboxes?.map((item) => (item.nativeElement.checked ? 1 : 0)) ?? [];

    const numOfCheckedRows = bodyRowCheckboxesValues.reduce((acc: number, value: number) => acc + value, 0);

    const isAllChecked = numOfCheckedRows === this.rows?.length;
    const isIndeterminate = numOfCheckedRows >= 1 && !isAllChecked;

    if (this.headerRowCheckbox) {
      this.headerRowCheckbox.nativeElement.checked = isAllChecked;
      this.headerRowCheckbox.nativeElement.indeterminate = isIndeterminate;
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
}
