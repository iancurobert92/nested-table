import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NestedTableBodyRowDirective } from './nested-table-body-row.directive';
import { NestedTableHeaderResizeDirective } from './nested-table-header-resize.directive';

const directives = [NestedTableBodyRowDirective, NestedTableHeaderResizeDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [directives],
  exports: [directives],
})
export class NestedTableModule {}
