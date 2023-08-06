import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NestedTableBodyRowDirective } from './nested-table-body-row.directive';

const directives = [NestedTableBodyRowDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [directives],
  exports: [directives],
})
export class NestedTableModule {}
