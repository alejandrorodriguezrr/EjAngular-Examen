export class ClientesModel {
    
    _id: string;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    direccion: string;
    telefono: number;

    constructor() {
        this._id = "";
        this.nombre = "";
        this.apellidos = "";
        this.email = "";
        this.password = "";
        this.direccion = "";
        this.telefono = 0;
    }
}
