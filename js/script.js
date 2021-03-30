// IIFE Structure
let pokemonRepository = (function () {
  let pokemonList= [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
    button.classList.add('group-list-item'); 
    button.classList.add('btn-secondary'); 
    button.addEventListener('click', function () {showDetails(pokemon);
    });

    listpokemon.appendChild(button); // If I don´t append the button to the listpokemon there would be no pokemons.
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
      item.weight = details.weight;
      item.types = details.types; // types cames from API, in the console.log it's an array
    }).catch(function (e) {
      console.log(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modal = document.createElement('div');
      modal.classList.add('modal'); // modal is defined in css.

      let closeButton = document.createElement('button');
      closeButton.classList.add('modal-close'); // modal-close is defined in css!
      closeButton.innerText = 'X';
      // close the button by pressing the x
      closeButton.addEventListener('click', function(){
      hideModal();
      });

      // Each variable has to match with a  name of the API Endpoints!
      let pokemonPicture = document.createElement('img');
      pokemonPicture.src = pokemon.imageUrl;

      let pokemonName = document.createElement('h2');
      pokemonName.classList.add('modal-title'); // is not needed for code execution.
      pokemonName.innerText = pokemon.name;

      let pokemonHeight = document.createElement('p');
      pokemonHeight.classList.add('modal-content');
      pokemonHeight.innerText = 'Height: ' + pokemon.height/10 + 'm';

      let pokemonWeight = document.createElement('p');
      pokemonWeight.classList.add('modal-content');
      pokemonWeight.innerText = 'Height: ' + pokemon.weight/10 + 'kg';


      // This order determines the order of the Modal!
      modal.appendChild(closeButton);
      modal.appendChild(pokemonPicture);
      modal.appendChild(pokemonName);
      modal.appendChild(pokemonHeight);
      modal.appendChild(pokemonWeight);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    });
  }
  // Function to close the modal by pressing esc
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Close the modal by making a click outside of the modal
  modalContainer.addEventListener('click', function (e) {
    let target = e.target;
    if (target = modalContainer) {
      hideModal();
    }
  });

  // Without this function there would be no content!
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    };


  // Saving the output values of the functions ! Take care of the order loadlist before addListItem
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,
    hideModal: hideModal,
  };
})();

// Function Calls with Callback Functions (Function in a Function)

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
