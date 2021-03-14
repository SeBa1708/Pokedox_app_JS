// IIFE Structure
var pokemonRepository = (function () {
  var pokemonList = [
    { name: 'balbasure', type: ['grass', 'poisson'], height: 0.7 },
    { name: 'pikachu', type: 'electric', height: 0.4 },
    { name: 'Jigglypuff', type: ['fairy', 'normal'], height: 2 },
];
  // Function add pokemon
  function add(pokemon)  {
    pokemonList.push(pokemon);
  }
  // Function to retrieve data of the pokemonList
  function getAll() {
    return pokemonList;
  }
  // Function to collect data
  function showDetails(pokemon) {
    console.log(pokemon);
  }
  // Function to create a list of all pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');// Reference to class from index.html
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.addEventListener('click', function() {showDetails(pokemon)}
    );
    listpokemon.appendChild(button); // otherwise there would be no bullet points
    pokemonList.appendChild(listpokemon); // without this there would be no content!
  }
  // Saving the output values of the functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

  // Function Calls
pokemonRepository.add({ name: 'Pikachu' });
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
