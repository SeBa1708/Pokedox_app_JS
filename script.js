
// IIFE Structure
var pokemonRepository = (function () {
  var pokemonList = [
    { name: 'balbasure', type: ['grass', 'poisson'], height: 0.7 },
    { name: 'pikachu', type: 'electric', height: 0.4 },
    { name: 'Jigglypuff', type: ['fairy', 'normal'], height: 2 },
];

// Function add pokemon
function add(pokemon){
    pokemonList.push(pokemon);
  }

// Function to retrieve data of the pokemonList
  function getAll() {
    return pokemonList;
  }

// Using the same name for keys and values
  return {
    add: add,
    getAll: getAll,
  };
})();

// Call the function
console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({ name: 'Pikachu' });
console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]


/* Original for each loop
pokemonList.forEach(function (pokemon) {if (pokemon.height > 1) {
      document.write('Name:' + pokemon.name + '- Height' + pokemon.height + 'm ---> That is huge '
      + '<br> </br>'); } else {
      document.write('Name:' + pokemon.name + '- Height' + pokemon.height + 'm ---> That is normal '
      + '<br> </br>');}
*/

// Using the foreach Method to iterate over the pokemonList to decide which pokemon is big oder normal.
pokemonRepository.getAll//using the getAll function to retrieve data
().forEach(function (pokemon) {if (pokemon.height > 1) {
      document.write('Name:' + pokemon.name + '- Height' + pokemon.height + 'm ---> That is huge '
      + '<br> </br>'); } else {
      document.write('Name:' + pokemon.name + '- Height' + pokemon.height + 'm ---> That is normal '
      + '<br> </br>');}
});



/* Normal for each method out of the IIFE scope! --> Task 1
pokemonList.forEach(function (pokemon) {if (pokemon.height > 1) {
      document.write('Name:' + pokemon.name + '- Height' + pokemon.height + 'm ---> That is huge '
      + '<br> </br>'); } else {
      document.write('Name:' + pokemon.name + '- Height' + pokemon.height + 'm ---> That is normal '
      + '<br> </br>');}
*/
