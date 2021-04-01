// IIFE Structure
const pokemonRepository = (function () {
  let pokemonList = []
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'
  let searchInput = document.querySelector('#search-bar')

  // Function add pokemon if it is an object and has a name
  function add (pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon)
    } else {
      console.log('pokemon is not correct')
    }
  }

  // Function to retrieve data of the pokemonList
  function getAll () {
    return pokemonList
  }

  // Function to create a list of all pokemon and manupulating the DOM
  function addListItem (pokemon) {
    let pokemonList = document.querySelector('.list-group') // Reference to class from index.html
    let listpokemon = document.createElement('li');
    listpokemon.classList.add('list-group-item');
    let button = document.createElement('button')
    button.innerText = pokemon.name
    button.classList.add('btn-primary')
    button.setAttribute('data-target', '#pokemonModal') // without this the modal would't open
    button.setAttribute('data-toggle', 'modal') // without this the modal would't open
    listpokemon.appendChild(button) // If I don´t append the button to the listpokemon there would be no pokemons.
    pokemonList.appendChild(listpokemon) // without this there would be no content!
    button.addEventListener('click', function () {
      showDetails(pokemon)
    })
  }

  // function to load all the pokemons and the add
  function loadList () {
    return fetch(apiUrl).then(function (response) {
      return response.json() // converted to json, json contains all pokomons
    }).then(function (json) {
      json.results.forEach(function (item) { // results came from the Pokemon api, results is an array object key call
        let pokemon = {
          name: item.name, // name comes from the API
          detailsUrl: item.url // url cames from the API
        }
        add(pokemon) // then we want to add the pokemon
      })
    }).catch(function (e) {
      console.error(e)
    })
  }

  function loadDetails (item) {
    let url = item.detailsUrl // Reference to detailsurl in loadList function
    return fetch(url).then(function (response) {
      return response.json()
    }).then(function (details) {
      // Add details to the item
      // Declaration of new variables (item parameter of loadDetails function )
      item.imageUrl = details.sprites.front_default // sprites.front_default cames from API
      item.height = details.height // height cames from API
      item.weight = details.weight
      item.types = details.types // types cames from API, in the console.log it's an array
    }).catch(function (e) {
      console.log(e)
    })
  }

  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      let modalBody = $('.modal-body')
      let modalTitle = $('.modal-title')

      modalTitle.empty()
      modalBody.empty()

      let pokemonName = $('<h1>' + pokemon.name + '</h1>')
      let pokemonImage = $('<img class="modal-img" style="width:30%">')
      pokemonImage.attr('src', pokemon.imageUrl) // jquery get the value of an attribute
      let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height/10 + ' m ' + '</p>')
      let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight/10 + ' kg ' + '</p>')

      modalTitle.append(pokemonName)
      modalBody.append(pokemonImage)
      modalBody.append(pokemonHeight)
      modalBody.append(pokemonWeight)
    });
  }
  
    searchInput.addEventListener('input', function(){
      let pokemonList = document.querySelectorAll('.list-group-item');
      let filterValue = searchInput.value.toUpperCase();

      pokemonList.forEach(function(pokemon){
        console.log(pokemon.innerText);
        if(pokemon.innerText.toUpperCase().indexOf(filterValue) > -1){
            pokemon.style.display = '';
        }else{
            pokemon.style.display = 'none';
        }
      })
    });


  // Saving the output values of the functions ! Take care of the order loadlist before addListItem
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();


// Function Calls with Callback Functions (Function in a Function)

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
