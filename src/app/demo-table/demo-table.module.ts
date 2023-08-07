import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NestedTableModule } from '../nested-table/nested-table.module';
import { DemoTableComponent } from './demo-table.component';

const components = [DemoTableComponent];

@NgModule({
  imports: [CommonModule, NestedTableModule, FormsModule, ReactiveFormsModule],
  declarations: [...components],
  exports: [...components],
})
export class DemoTableModule {}
