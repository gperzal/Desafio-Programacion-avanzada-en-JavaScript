export class Animal {
    #nombre;
    #edad;
    #img;
    #comentarios;
    #sonido;
  
    constructor(nombre, edad, img, comentarios) {
      this.#nombre = nombre;
      this.#edad = edad;
      this.#img = img;
      this.#comentarios = comentarios;
      this.#sonido = new Audio();
    }
  
    get nombre() {
      return this.#nombre;
    }
  
    get edad() {
      return this.#edad;
    }
    
    get img() {
      return this.#img;
    }
  
    get comentarios() {
      return this.#comentarios;
    }
  
    set comentarios(nuevosComentarios) {
      this.#comentarios = nuevosComentarios;
    }
  
    setSonido(rutaSonido) {
      this.#sonido.src = rutaSonido;
    }
  
    emitirSonido() {
      this.#sonido.play();
    }
  }
  