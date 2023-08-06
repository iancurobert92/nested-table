import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nestedTableHeaderResize]',
})
export class NestedTableHeaderResizeDirective implements OnInit {
  private startX: number = 0;
  private startWidth: number = 0;
  private resizeHandle?: HTMLDivElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'hover');
    this.renderer.setStyle(this.resizeHandle, 'display', 'block');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'hover');
    this.renderer.setStyle(this.resizeHandle, 'display', 'none');
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
    this.renderer.setStyle(this.el.nativeElement, 'user-select', 'none');

    this.resizeHandle = this.renderer.createElement('div');
    this.renderer.setStyle(this.resizeHandle, 'width', '2px');
    this.renderer.setStyle(this.resizeHandle, 'background-color', '#ddd');
    this.renderer.setStyle(this.resizeHandle, 'cursor', 'col-resize');
    this.renderer.setStyle(this.resizeHandle, 'position', 'absolute');
    this.renderer.setStyle(this.resizeHandle, 'top', '0');
    this.renderer.setStyle(this.resizeHandle, 'bottom', '0');
    this.renderer.setStyle(this.resizeHandle, 'right', '-1px');
    this.renderer.setStyle(this.resizeHandle, 'display', 'none');

    this.renderer.addClass(this.el.nativeElement, 'resize-header');

    this.renderer.appendChild(this.el.nativeElement, this.resizeHandle);
  }

  private onMouseMove = (event: MouseEvent) => {
    const width = this.startWidth + (event.pageX - this.startX);
    const minWidth = 50;

    this.renderer.setStyle(this.el.nativeElement, 'width', Math.max(minWidth, width) + 'px');
  };

  private onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
}
