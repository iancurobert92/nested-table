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

  readonly BACKGROUND_COLOR_DEFAULT = '#fff';

  readonly BACKGROUND_COLOR_HOVER = '#fff';

  constructor(private el: ElementRef, private renderer: Renderer2, private vcRef: ViewContainerRef) {}

  @HostListener('mouseenter')
  onMouseOver() {
    this.setElementBackgroundColor(this.BACKGROUND_COLOR_HOVER);
  }

  @HostListener('mouseleave')
  onMouseOut() {
    this.setElementBackgroundColor(this.BACKGROUND_COLOR_DEFAULT);
  }

  ngOnInit() {
    this.setElementBackgroundColor(this.BACKGROUND_COLOR_DEFAULT);
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

  show() {
    this.isVisible = true;

    this.setElementDisplayType('table-row');
  }

  hide() {
    this.isVisible = false;

    this.setElementDisplayType('none');
  }

  private setElementBackgroundColor(value: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', value);
  }

  private setElementDisplayType(value: string) {
    this.renderer.setStyle(this.el.nativeElement, 'display', value);
  }
}
