import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hijo',
  standalone: true,
  templateUrl: './hijo.html',
  styleUrl: './hijo.css',
})
export class Hijo implements OnChanges {

  @Input() productos: any[] = [];
  @Output() totalCalculado = new EventEmitter<number>();

  total: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productos']) {
      this.total = this.calcularTotal(this.productos);
      this.totalCalculado.emit(this.total);
    }
  }

  private calcularTotal(productos: any[]): number {
    if (!Array.isArray(productos)) return 0;

    return productos.reduce((acc, p) => {
      const c = Number(p?.cantidad);
      return acc + (Number.isFinite(c) ? c : 1);
    }, 0);
  }
}