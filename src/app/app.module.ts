import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DemoTableModule } from './demo-table/demo-table.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DemoTableModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
