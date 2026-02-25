import { Component } from '@angular/core';
import { ComprasServices } from '../../services/compras-services';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  todoslosproductos: any[] = []
  comprasCliente: any[] = []; 
  cargando: boolean = false;
  error: string = '';
  clienteId: string = '';
  sinCompras: boolean = false;
  totalProductos=0
  constructor(public comprasService: ComprasServices) {}

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
  this.comprasService.mostrarComprasCliente(this.clienteId).subscribe({
    next: (data: any) => {
      data.forEach((compra: any) => {
        compra.libros.forEach((libro: any) => {
          this.todoslosproductos.push(libro);
        });
      });
      // El padre cuenta el total directamente
      this.totalProductos = this.todoslosproductos.length;
    },
    error: (err) => console.error('Error:', err)
  });
}
  }


