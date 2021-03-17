// IIFE Structure
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function add pokemon if it is an object and has a name
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  // Function to retrieve data of the pokemonList
  function getAll() {
    return pokemonList;
  }

  // Function to create a list of all pokemon and manupulating the DOM
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');// Reference to class from index.html
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.addEventListener('click', function () {showDetails(pokemon);
    });
    listpokemon.appendChild(button); // otherwise there would be no bullet points
    pokemonList.appendChild(listpokemon); // without this there would be no content!
  }

  // function to load all the pokemons and the add
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json(); // converted to json, json contains all pokomons
    }).then(function (json) {
      json.results.forEach(function (item) { //results came from the Pokemon api, results is an array
        // object key call
        let pokemon = {
          name: item.name, // name comes from the API
          detailsUrl: item.url, // url cames from the API
        };
        add(pokemon); // then we want to add the pokemon
      });
    }).catch(function (e) {
        console.error(e);
      });
  }


  function loadDetails(item) {
    let url = item.detailsUrl; // Reference to detailsurl in loadList function
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Add details to the item
      // Declaration of new variables (item parameter of loadDetails function )
      item.imageUrl = details.sprites.front_default; // sprites.front_default cames from API
      item.height = details.height; // height cames from API
      item.types = details.types; // types cames from API, in the console.log it's an array
    }).catch(function (e) {
      console.log(e);
    });
  }

  function showDetails (item)  {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }


  // Saving the output values of the functions ! Take care of the order loadlist before addListItem
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,

  };
})();

// Function Calls with Callback Functions (Function in a Function)

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
