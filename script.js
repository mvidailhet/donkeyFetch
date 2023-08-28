
const listUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';


// Affichage des noms des 10 premiers pokémons

fetch(listUrl)
.then((response) => response.json())
.then((listData) => {
  console.log(listData);
  const list = listData.results;
  list.forEach(pokemon => {
    console.log(pokemon.name);
  });
})

// affichager des détails du pokémon Pikachu
const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
fetch(url)
.then((response) => response.json())
.then(data => console.log(data));