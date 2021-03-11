"use strict";

let pokemonList = [
  {name: 'balbasure', type:['grass','poisson'], height: 0.7},
  {name: 'pikachu', type:'electric', height: 0.4},
  {name: 'Jigglypuff', type:['fairy','normal'],height: 2}
];

// for each loop instead of for loop 
pokemonList.forEach(function(pokemon) {if (pokemon.height > 1) {
    document.write('Name:' + pokemon.name + '- Height' + pokemon.height + 'm ---> That is huge' + '<br> </br>');
} else {
    document.write('Name:' + pokemon.name + '- Height' + pokemon.height + 'm ---> That is normal' +'<br> </br>');
}
});
