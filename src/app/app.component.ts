import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Entity } from './models/entity';
import { NestedTableBodyRowDirective } from './nested-table/nested-table-body-row.directive';
import { TableService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChildren(NestedTableBodyRowDirective)
  rows?: QueryList<NestedTableBodyRowDirective>;

  @ViewChild('headerRowCheckbox')
  headerRowCheckbox?: ElementRef<HTMLInputElement>;

  @ViewChildren('bodyRowCheckbox')
  bodyRowCheckboxes?: QueryList<ElementRef<HTMLInputElement>>;

  data: Entity[] = [];

  searchResults: Entity[] = [];

  form = this.fb.group({
    name: '',
  });

  get nameForm(): FormControl {
    return this.form.get('name') as FormControl;
  }

  constructor(private tableService: TableService, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tableService.getData().subscribe((value) => {
      this.data = value;
      this.searchResults = [...this.data];
      console.log(value);
    });

    this.form.valueChanges.pipe(debounceTime(500)).subscribe((formValue: any) => {
      this.onSearch(formValue.name);
    });
  }

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

  private onSearch(name: string) {
    name = name.trim();

    this.searchResults = [];

    if (name === '') {
      this.searchResults = [...this.data];

      this.cdRef.detectChanges();

      this.initRowsState();

      return;
    }

    this.data.forEach((entity: Entity) => this.searchEntityByName(name, entity));

    this.cdRef.detectChanges();

    this.initRowsState();
  }

  searchEntityByName(name: string, entity: any) {
    const searchName = name.toLowerCase();
    const entityName = entity.name.toLowerCase();

    if (entityName.includes(searchName)) {
      this.searchResults.push(entity);
    }

    if (entity.children) {
      entity.children.forEach((child: any) => this.searchEntityByName(name, child));
    }
  }
}
