import { Component } from '@angular/core';
import { ClientesServices } from '../../services/clientes-services';
import { ComprasServices } from '../../services/compras-services';

@Component({
  selector: 'app-padre',
  imports: [],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

  clientesqueSi: any[]=[]
  comprasCliente: any[] = []; 
  cargando: boolean = false;
  error: string = '';
  clienteId: string = '';
  sinCompras: boolean = false;

  constructor(private clientesServices:ClientesServices,
    private comprasServices: ComprasServices
  ){}

  ngOnInit(){
    this.comprasServices.mostrarCompras().subscribe({
      next: (data:any) => {

      }
    })
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

}
