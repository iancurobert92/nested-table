import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nestedTableHeaderResize]',
})
export class NestedTableHeaderResizeDirective implements OnInit {
  private startX: number = 0;

  private startWidth: number = 0;

  private resizeIndicator?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showResizeIndicator();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideResizeIndicator();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();

    this.startX = event.pageX;
    this.startWidth = this.el.nativeElement.getBoundingClientRect().width;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    this.resizeIndicator = this.createResizeIndicator(2, '#ddd');

    this.renderer.appendChild(this.el.nativeElement, this.resizeIndicator);

    this.hideResizeIndicator();
  }

  private onMouseMove = (event: MouseEvent) => {
    const newWidth = this.startWidth + (event.pageX - this.startX);

    this.setElementWidth(newWidth);
  };

  private onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  private createResizeIndicator(width: number, color: string) {
    const indicator = this.renderer.createElement('div');

    this.renderer.setStyle(indicator, 'width', `${width}px`);
    this.renderer.setStyle(indicator, 'background-color', color);
    this.renderer.setStyle(indicator, 'cursor', 'col-resize');
    this.renderer.setStyle(indicator, 'position', 'absolute');
    this.renderer.setStyle(indicator, 'top', '0');
    this.renderer.setStyle(indicator, 'bottom', '0');
    this.renderer.setStyle(indicator, 'right', `${-width / 2}px`);

    return indicator;
  }

  private showResizeIndicator() {
    if (!this.resizeIndicator) return;

    this.setResizeIndicatorDisplayType('block');
  }

  private hideResizeIndicator() {
    if (!this.resizeIndicator) return;

    this.setResizeIndicatorDisplayType('none');
  }

  private setResizeIndicatorDisplayType(value: string) {
    this.renderer.setStyle(this.resizeIndicator, 'display', value);
  }

  private setElementWidth(value: number) {
    this.renderer.setStyle(this.el.nativeElement, 'width', `${value}px`);
  }
}
