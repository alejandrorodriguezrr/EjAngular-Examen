import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from '../hijo/hijo';

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  comprasCliente: any[] = [];
  productosTodasCompras: any[] = [];   // NUEVO
  totalProductos: number = 0;          // NUEVO

  cargando: boolean = false;
  error: string = '';
  clienteId: string = '';
  sinCompras: boolean = false;

  constructor(public comprasService: ComprasServices) {}

  ngOnInit(): void {                   // NUEVO (recomendado)
    this.obtenerClienteId();
    if (this.clienteId) {
      this.cargarHistorialCompras();
    }
  }

  obtenerClienteId() {
    console.log('Buscando ID del cliente...');

    const userData = localStorage.getItem('user');
    console.log('Datos en localStorage.user:', userData);

    if (userData && userData !== 'null' && userData !== 'undefined') {
      try {
        const user = JSON.parse(userData);
        console.log('Usuario parseado:', user);

        if (user._id && user._id !== 'admin') {
          this.clienteId = user._id;
          console.log('Cliente ID obtenido:', this.clienteId);
          return;
        } else if (user._id === 'admin') {
          console.warn('Usuario admin detectado, no puede ver historial de compras');
          this.error = 'Los administradores no tienen historial de compras.';
          return;
        }
      } catch (e) {
        console.error('Error al parsear datos del usuario:', e);
      }
    }

    const clienteData = localStorage.getItem('cliente');
    if (clienteData && clienteData !== 'null' && clienteData !== 'undefined') {
      try {
        const cliente = JSON.parse(clienteData);
        this.clienteId = cliente._id || cliente.id;
        if (this.clienteId && this.clienteId !== 'admin') {
          console.log('Cliente ID obtenido (fallback):', this.clienteId);
          return;
        }
      } catch (e) {
        console.error('Error al parsear cliente:', e);
      }
    }

    console.error('No se encontró ID de cliente en localStorage');
  }

  cargarHistorialCompras() {
    this.cargando = true;
    this.error = '';
    this.sinCompras = false;

    this.comprasService.mostrarComprasCliente(this.clienteId).subscribe({
      next: (data: any) => {
        this.comprasCliente = data;

        // NUEVO: sacar todos los productos de todas las compras
        this.productosTodasCompras = this.extraerProductosDeCompras(this.comprasCliente);

        this.cargando = false;

        if (this.comprasCliente.length === 0) {
          this.sinCompras = true;
        }
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error al cargar historial:', err);

        if (err.status === 404) {
          this.error = 'Cliente no encontrado. Por favor, verifique su sesión.';
        } else if (err.status === 0) {
          this.error = 'No se pudo conectar con el servidor. Verifique su conexión.';
        } else {
          this.error = 'Error al cargar el historial de compras. Por favor, intente nuevamente.';
        }
      }
    });
  }

  // NUEVO: aplana productos de todas las compras
  private extraerProductosDeCompras(compras: any[]): any[] {
    return (compras ?? []).flatMap((c: any) => {
      const lineas = c.items ?? c.productos ?? c.carrito ?? c.lineas ?? [];
      return lineas.map((l: any) => {
        const cantidad = Number(l?.cantidad ?? l?.unidades ?? 1);
        return { ...l, cantidad: Number.isFinite(cantidad) ? cantidad : 1 };
      });
    });
  }

  // NUEVO: recibe el total desde el hijo
  recibirTotal(total: number) {
    this.totalProductos = total;
  }
}