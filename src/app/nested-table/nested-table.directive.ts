import { AfterContentInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { NestedTableBodyRowDirective } from './nested-table-body-row.directive';
import { NestedTableService } from './nested-table.service';

@Directive({
  selector: '[nestedTable]',
})
export class NestedTableDirective implements AfterContentInit {
  @ContentChildren(NestedTableBodyRowDirective)
  rows?: QueryList<NestedTableBodyRowDirective>;

  constructor(private nestedTableService: NestedTableService) {}

  ngAfterContentInit(): void {
    if (!this.rows) return;

    this.nestedTableService.setRows(this.rows);

    this.nestedTableService.collapseAll();
  }
}
