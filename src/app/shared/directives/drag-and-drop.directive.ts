import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[appDragAndDrop]' })
export class DragAndDropDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  @HostListener('drop', ['$event']) onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    console.log('drop');

    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const fileName: string = files[0].name;
      const isFileTypeCsv = fileName.split('.');

      if (isFileTypeCsv[1] !== 'csv') {
        return;
      }

      this.onFileDropped.emit(files);
    }
  }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    console.log('dragover');
  }
}
