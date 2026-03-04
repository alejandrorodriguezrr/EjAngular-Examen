import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasServices } from '../../services/compras-services';
import { ClientesServices } from '../../services/clientes-services';

@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit {
  comprasCliente: any[] = []; 
  cargando: boolean = false;
  error: string = '';
  clienteId: string = '';
  sinCompras: boolean = false;

  constructor(public comprasService: ComprasServices, private clientesService: ClientesServices) {}

  ngOnInit() {
    console.log('=== INICIANDO HISTORIAL COMPONENT ===');
    console.log('LocalStorage completo:', localStorage);
    console.log('Cliente en localStorage:', localStorage.getItem('cliente'));
    
    this.obtenerClienteId();
    
    console.log('Cliente ID después de obtener:', this.clienteId);
    
    if (this.clienteId) {
      this.cargarHistorialCompras();
    } else {
      this.error = 'No se ha identificado al cliente. Por favor, inicie sesión.';
      console.error('❌ No se pudo obtener el ID del cliente');
    }
    this.calcularCliente()
  }

  obtenerClienteId() {
    console.log('🔍 Buscando ID del cliente...');
    
    const userData = localStorage.getItem('user');
    console.log('📦 Datos en localStorage.user:', userData);
    
    if (userData && userData !== 'null' && userData !== 'undefined') {
      try {
        const user = JSON.parse(userData);
        console.log('✅ Usuario parseado:', user);
        
        if (user._id && user._id !== 'admin') {
          this.clienteId = user._id;
          console.log('✅ Cliente ID obtenido:', this.clienteId);
          return;
        } else if (user._id === 'admin') {
          console.warn('⚠️ Usuario admin detectado, no puede ver historial de compras');
          this.error = 'Los administradores no tienen historial de compras.';
          return;
        }
      } catch (e) {
        console.error('❌ Error al parsear datos del usuario:', e);
      }
    }
    
    const clienteData = localStorage.getItem('cliente');
    if (clienteData && clienteData !== 'null' && clienteData !== 'undefined') {
      try {
        const cliente = JSON.parse(clienteData);
        this.clienteId = cliente._id || cliente.id;
        if (this.clienteId && this.clienteId !== 'admin') {
          console.log('✅ Cliente ID obtenido (fallback):', this.clienteId);
          return;
        }
      } catch (e) {
        console.error('❌ Error al parsear cliente:', e);
      }
    }
    
    console.error('❌ No se encontró ID de cliente en localStorage');
    console.log('💡 Verifica que hayas iniciado sesión correctamente');
  }

  cargarHistorialCompras() {
    this.cargando = true;
    this.error = '';
    this.sinCompras = false;

    this.comprasService.mostrarComprasCliente(this.clienteId).subscribe({
      next: (data: any) => {
        this.comprasCliente = data;
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

  nombreCliente:string=""
  totalProductos:number=0

  calcularCliente(){
    this.clientesService.mostrarClientes().subscribe({
      next: (clientes:any) => {
        let MaxCompras=0
        clientes.forEach((cliente:any) => {
          this.comprasService.mostrarComprasCliente(cliente._id).subscribe({
            next: (compras:any) => {
              if(compras.length>MaxCompras){
                MaxCompras=compras.length
                this.nombreCliente=cliente.nombre
                this.totalProductos=0

                compras.forEach((compra:any) => {
                  compra.libros.forEach((libro:any) => {
                    this.totalProductos+=libro.cantidad
                  });
                });
              }
            }
          })
        });
      }
    })
  }

  calcularTotalLibros(compra: any): number {
    return compra.libros?.length || 0;
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(precio);
  }

  expandedCards: { [key: string]: boolean } = {};

  toggleCard(id: string) {
  this.expandedCards[id] = !this.expandedCards[id];
  }

}