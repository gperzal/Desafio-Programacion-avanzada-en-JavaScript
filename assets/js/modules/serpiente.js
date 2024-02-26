import { Animal } from './animal.js';
import { getAnimalsData } from '../utils/api.js';

export class Serpiente extends Animal {
    static async crearInstancia() {
        const animales = await getAnimalsData();
        const { nombre, edad, img, comentarios, sonido } = animales.find(animal => animal.nombre === 'Serpiente');
        return new Serpiente(nombre, edad, img, comentarios, sonido);
    }

    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios);
        this.sonido = `assets/sounds/${sonido}`;
    }

    Sisear() {
        this.emitirSonido();
    }
}
