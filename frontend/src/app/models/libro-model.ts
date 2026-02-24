
export class LibroModel {
    _id:string;
    titulo: string;
    autor: string;
    editorial: string;
    genero: string;
    precio: number;
    stock: number;
    imagen: string;

    constructor(){
        this._id="";
        this.titulo="";
        this.autor="";
        this.editorial="";
        this.genero="";
        this.precio=0;
        this.stock=0;
        this.imagen="";
    }

}
