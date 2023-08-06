import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';

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

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover')
  onMouseOver() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#eee');
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff');
  }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff');
  }

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
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }

  show() {
    this.isVisible = true;
    this.renderer.setStyle(this.el.nativeElement, 'display', 'table-row');
  }
}
