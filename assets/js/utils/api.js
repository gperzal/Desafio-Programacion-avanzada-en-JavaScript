export async function getAnimalsData() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/gperzal/Desafio-Prueba-Animales-Salvajes/animales');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos de los animales:', error);
    }
}