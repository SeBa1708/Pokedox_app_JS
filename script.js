"use strict";

let pokemonList = [
  {name: 'balbasure', type:['grass','poisson'], height: 0.7},
  {name: 'pikachu', type:'electric', height: 0.4},
  {name: 'Jigglypuff', type:['fairy','normal'],height: 2}
];


//Part 1 Running a for loop to write all information about the pokemons is the DOM!

for (let i = 0; i < pokemonList.length; i++){
document.write(`Name: ${pokemonList[i].name} Height: ${pokemonList[i].height} m <br/> <br/>` )};

// Part 3  Running a for loop to write all information about the pokemons is the DOM!
//Adding a conditional (height 1.5) to check if the pokemon is above a certain value.

for (let i = 0; i < pokemonList.length; i++)
{
if (pokemonList[i].height > 1.5) {
  document.write(`Name: ${pokemonList[i].name} - Height: ${pokemonList[i].height} m ---> That is huge <br/> <br/>` );
  } else {
      document.write (`Name: ${pokemonList[i].name} - Height: ${pokemonList[i].height} m <br/> <br/>`)
  }
};
