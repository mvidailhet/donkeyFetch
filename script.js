const listUrl = "https://pokeapi.co/api/v2/pokemon?limit=3";

fetch(listUrl)
.then(response => response.json())
.then((listData) => {
  const pokemons = listData.results;

  pokemons.forEach(pokemon => {
    fetch(pokemon.url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    })
  });
});
