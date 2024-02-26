import { Leon } from './modules/leon.js';
import { Aguila } from './modules/aguila.js';
import { Lobo } from './modules/lobo.js';
import { Oso } from './modules/oso.js';
import { Serpiente } from './modules/serpiente.js';
import { getAnimalsData } from './utils/api.js';
import { Animal } from './modules/animal.js';



let animalPreview = (() => {
    const getImage = async () => {
        const animales = await getAnimalsData();

        document.getElementById('animal').addEventListener('change', () => {
            const animalSeleccionado = document.getElementById('animal').value;
            //animalData Datos Obtener del JSOn al momento de seleccionar el animal
            const animalData = animales.find(({ name }) => name === animalSeleccionado);

            if (animalData) {
                const { imagen } = animalData;

                document.getElementById('preview').style.backgroundImage = `url('assets/img/${imagen}')`;
            } else {
                console.log('Animal no encontrado:', animalSeleccionado);
                // Manejar el caso en que el animal no se encuentra, por ejemplo, limpiando el preview o mostrando una imagen predeterminada
            }
        });
    };

    return {
        showImage: getImage
    };
})();


// IIFE for managing animal cards
let animalCardsManager = (() => {
    const createAnimalCard = (animalData) => {
        const card = document.createElement('div');
        card.className = 'animal-card col-12 my-3 col-sm-4 bg-dark ';
        card.innerHTML = `
            <img src="assets/img/${animalData.imagen}" class="card-img-top" alt="${animalData.name}">
            <div class="card-body">
                <h5 class="card-title text-white">${animalData.name}</h5>
                <p class="card-text text-white scrollable-p">${animalData.comentarios}</p>
                <audio controls class="w-100">
                    <source src="${animalData.sonido}" >
                </audio>
            </div>
        `;

        // Add click event listener to the card
        document.getElementById('Animales').appendChild(card);
        card.querySelector('img').addEventListener('click', () => showModal(animalData));

    };

    const addAnimal = (name, imagen, sonido, comentarios, edad) => {
        const animalData = { name, imagen, sonido, comentarios, edad };
        createAnimalCard(animalData);
    };

    return { addAnimal };
})();

// Event listener for the "Agregar" button
document.getElementById('btnRegistrar').addEventListener('click', () => {
    const animalName = document.getElementById('animal').value;
    const animalAge = document.getElementById('edad').value;
    const animalComments = document.getElementById('comentarios').value;

    let newAnimal;
    switch (animalName) {
        case 'Leon':
            newAnimal = new Leon(animalName, animalAge, 'Leon.png', animalComments, 'Rugido.mp3');
            break;
        case 'Lobo':
            newAnimal = new Lobo(animalName, animalAge, 'Lobo.jpg', animalComments, 'Aullido.mp3');
            break;
        case 'Oso':
            newAnimal = new Oso(animalName, animalAge, 'Oso.jpg', animalComments, 'Gruñido.mp3');
            break;
        case 'Serpiente':
            newAnimal = new Serpiente(animalName, animalAge, 'Serpiente.jpg', animalComments, 'Siseo.mp3');
            break;
        case 'Aguila':
            newAnimal = new Aguila(animalName, animalAge, 'Aguila.png', animalComments, 'Chillido.mp3');
            break;
        default:
            console.log("Animal no encontrado:", animalName);
            break;

    }


    // Then add the new animal card to the DOM
    animalCardsManager.addAnimal(newAnimal.nombre, newAnimal.img, newAnimal.sonido, newAnimal.comentarios, newAnimal.edad);

    document.getElementById('animal').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('comentarios').value = '';

});


(async () => {
    animalPreview.showImage();
})();


function showModal(animalData) {
    console.log("Animal data:", animalData);
    //No estamos reciendo el parametro edad de la clase animal
    console.log("Animal nombre:", animalData.name);

    // Get the modal elements
    const modal = document.getElementById('exampleModal');
    const modalBody = modal.querySelector('.modal-body');

    // Set the content of the modal
    modalBody.innerHTML = `
        <img src="assets/img/${animalData.imagen}" class="img-fluid" alt="${animalData.name}" width="100%">
        <div class="text-light">
            <p class="card-text text-center pt-3">${animalData.edad}</p>
            <hr class="bg-light">
            <p class="text-left">Comentarios:</p>
          
            <p>${animalData.comentarios}</p>
        
          
        </div>
    `;

    // Use Bootstrap's modal method to show the modal
    $(modal).modal('show');
}