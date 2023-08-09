import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NestedTableBodyRowDirective, NestedTableDirective, NestedTableHeaderResizeDirective } from './directives';

const directives = [NestedTableDirective, NestedTableBodyRowDirective, NestedTableHeaderResizeDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...directives],
  exports: [...directives],
})
export class NestedTableModule {}
