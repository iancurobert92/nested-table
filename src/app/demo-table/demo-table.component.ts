import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, delay, tap } from 'rxjs';
import { NestedTableBodyRowDirective } from '../nested-table';
import { NestedTableService } from '../nested-table/nested-table.service';
import { Entity } from './models';
import { TableDataService } from './services';

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss'],
})
export class DemoTableComponent implements OnInit {
  @ViewChild('headerRowCheckbox')
  headerRowCheckbox?: ElementRef<HTMLInputElement>;

  @ViewChildren('bodyRowCheckbox')
  bodyRowCheckboxes?: QueryList<ElementRef<HTMLInputElement>>;

  data: Entity[] = [];

  readonly nameForm = this.fb.nonNullable.control('');

  constructor(
    private tableDataService: TableDataService,
    private nestedTableService: NestedTableService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tableDataService
      .getData()
      .pipe(
        tap(this.setData),
        delay(0),
        tap(() => this.nestedTableService.collapseAll())
      )
      .subscribe();

    this.nameForm.valueChanges.pipe(debounceTime(500)).pipe(tap(this.tableDataService.filterByName)).subscribe();
  }

  onToggleRow(rootRow: NestedTableBodyRowDirective) {
    this.nestedTableService.toggleRow(rootRow);
  }

  onHeaderCheckboxValueChange() {
    if (!this.headerRowCheckbox) return;

    const checkbox = this.headerRowCheckbox.nativeElement;

    this.bodyRowCheckboxes?.forEach((bodyCheckbox) => {
      bodyCheckbox.nativeElement.checked = checkbox.checked;
    });
  }

  onBodyRowCheckboxValueChange() {
    const bodyRowCheckboxesValues = this.bodyRowCheckboxes?.map((item) => (item.nativeElement.checked ? 1 : 0)) ?? [];

    const numOfCheckedRows = bodyRowCheckboxesValues.reduce((acc: number, value: number) => acc + value, 0);

    const isAllChecked = numOfCheckedRows === this.nestedTableService.rows?.length;
    const isIndeterminate = numOfCheckedRows >= 1 && !isAllChecked;

    if (this.headerRowCheckbox) {
      this.headerRowCheckbox.nativeElement.checked = isAllChecked;
      this.headerRowCheckbox.nativeElement.indeterminate = isIndeterminate;
    }
  }

  private setData = (value: Entity[]) => {
    this.data = value;
  };
}
