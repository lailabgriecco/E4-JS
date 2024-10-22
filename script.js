// Obtener elementos del DOM
const searchBtn = document.getElementById('search-btn');
const pokemonContainer = document.getElementById('pokemon-container');

// Añadir un evento click al botón
searchBtn.addEventListener('click', () => {
    const pokemonId = document.getElementById('pokemon-id').value;

    // Validar que el input no esté vacío
    if (!pokemonId) {
        renderErrorMessage('Por favor, ingresa un número de Pokémon válido.');
        return;
    }

    // Llamada a la API de Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró ningún Pokémon con ese número.');
            }
            return response.json();
        })
        .then(pokemon => {
            renderPokemonCard(pokemon);
        })
        .catch(error => {
            renderErrorMessage(error.message);
        });
});

// Función para renderizar la card del Pokémon
function renderPokemonCard(pokemon) {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', '); // Obtenemos los tipos
    const heightInMeters = pokemon.height / 10; // Convertir altura a metros
    const weightInKg = pokemon.weight / 10; // Convertir peso a kilogramos

    pokemonContainer.innerHTML = `
        <div class="pokemon-card">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img class="pokemon-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p><strong>Tipo:</strong> ${types}</p>
            <p><strong>Altura:</strong> ${heightInMeters} m</p>
            <p><strong>Peso:</strong> ${weightInKg} kg</p>
        </div>
    `;
}

// Función para renderizar un mensaje de error
function renderErrorMessage(message) {
    pokemonContainer.innerHTML = `<p class="error-message">${message}</p>`;
}
