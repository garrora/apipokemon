// Variables
const card = document.getElementById('card');
const btnGenerateRandomPokemon = document.getElementById('btnGenerateRandomPokemon');

// Tipos de colores, basado en el tipo de pokemon
const typeColor = {
    bug: '#26de81',
    dragon: '#ffeaa7',
    electric: '#fed330',
    fairy: '#ff0069',
    fighting: '#30336b',
    fire: '#f0932b',
    flying: '#81ecec',
    grass: '#00b894',
    ground : '#efb549',
    ghost: '#a55eea',
    ice: '#74b9ff',
    normal: '#95afc0',
    poison: '#6c5ce7',
    psichic: '#a29bfe',
    rock: '#2d3436',
    water: '#0190ff',
};

// Template
const templateCard = document.getElementById('templateCard').content;

// Fragment reflow
const fragment = document.createDocumentFragment();

// Carga el DOM con un pokemon seleccionado al azar
document.addEventListener('DOMContentLoaded', () => {
    const id = generateRandomNumber();
    getPokemon(id);
})

btnGenerateRandomPokemon.addEventListener('click', () => {
    const id = generateRandomNumber();
    getPokemon(id);
})

// Obtiene un numero random entre el 1 y 150
const generateRandomNumber = () => {
    let id = Math.floor(Math.random() * 150) + 1;
    return id;
}


// Consume la API indicada, con el numero random anterior, se genera la card acorde al numero random
const getPokemon = async(id) => {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json()
    
    removerChilds(card);
    
    generateCardPokemon(data);
    
    
}

const generateCardPokemon = (data) => {
    
    // Color basado en el tipo de pokemon
    const themeColor = typeColor[data.types[0].type.name];

    templateCard.querySelector('img').setAttribute('src', data.sprites.other.dream_world.front_default);
    templateCard.querySelector('h2').textContent = data.name;
    templateCard.querySelector('.hp').innerHTML = `<span>HP</span> ${data.stats[0].base_stat}`;
    templateCard.querySelector('#pokemon__atak h3').textContent = data.stats[1].base_stat;
    templateCard.querySelector('#pokemon__def h3').textContent = data.stats[2].base_stat;
    templateCard.querySelector('#pokemon__special h3').textContent = data.stats[3].base_stat;
    templateCard.querySelector('.types span').textContent = data.types[0].type.name;


    // Colores a etiquetas p
    templateCard.querySelector('#pokemon__atak p').style.color = themeColor;
    templateCard.querySelector('#pokemon__def p').style.color = themeColor;
    templateCard.querySelector('#pokemon__special p').style.color = themeColor;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
    card.appendChild(fragment);
    

    // Selecciona el color basado en el array de objetos de color, selecciona la primera posicion de los tipos 
    card.style.background = `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)`;

}

// Remueve los hijos anteriores, limpia cada vez que se genera un pokemon nuevo
const removerChilds = (child) => {
    while(child.hasChildNodes()){
        child.removeChild(card.firstChild);
    }
}




