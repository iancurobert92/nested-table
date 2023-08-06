import { Directive, ElementRef, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[nestedTableBodyRow]',
  exportAs: 'nestedTableBodyRow',
})
export class NestedTableBodyRowDirective implements OnInit {
  @Input()
  parent?: NestedTableBodyRowDirective;

  @Input()
  level: number = 0;

  @Input()
  isExpanded: boolean = false;

  @Input()
  isVisible: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  expand() {
    this.isExpanded = true;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded ? this.collapse() : this.expand();
  }

  hide() {
    this.isVisible = false;
    this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
  }

  show() {
    this.isVisible = true;
    this.renderer.setStyle(this.element.nativeElement, 'display', 'table-row');
  }
}
