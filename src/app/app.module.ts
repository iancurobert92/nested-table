import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NestedTableModule } from './nested-table/nested-table.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NestedTableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
