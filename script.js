const listUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";

// On stoque dans la variable cards le div avec la classe cards
const cards = document.querySelector(".cards");

function createCard(title, imageUrl, types) {
  // On crée un div avec la classe card
  const card = document.createElement("div");
  card.classList.add("card");
  cards.appendChild(card);

  // On crée un div avec la classe card-header et on l'ajoute à la card
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  card.appendChild(cardHeader);

  // On crée un div avec la classe card-img et on l'ajoute à la cardHeader
  const cardImg = document.createElement("div");
  cardImg.style.backgroundImage = `url(${imageUrl})`;
  cardImg.classList.add("card-img");
  cardHeader.appendChild(cardImg);

  /**
   * Étape 1: Créez la div cardBody, ajoutez la classe card-body et ajoutez-la à la carte
   */
  const cardBodyElt = document.createElement("div");
  cardBodyElt.classList.add("card-body");
  card.appendChild(cardBodyElt);

  /**
   * Étape 2
   * Créez le h2 cardTitle, ajoutez la classe card-title,
   * définissez le texte à l'intérieur de la balise sur le paramètre "title" de cette fonction
   * et ajoutez-le à la cardBody
   */
  const h2Elt = document.createElement("h2");
  h2Elt.classList.add("card-title");
  h2Elt.textContent = title;
  cardBodyElt.appendChild(h2Elt);


  const pokemonTypesElt = document.createElement("ul");
  pokemonTypesElt.classList.add("pokemon-types");
  cardBodyElt.appendChild(pokemonTypesElt);

  types.forEach((pokemonType) => {
    const pokemonTypeElt = document.createElement("li");
    pokemonTypeElt.classList.add("pokemon-type");
    pokemonTypeElt.textContent = pokemonType;
    pokemonTypesElt.appendChild(pokemonTypeElt);
  });
}

fetch(listUrl)
  .then((response) => response.json())
  .then((listData) => {
    const pokemons = listData.results;

    pokemons.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const types = data.types.map(type => type.type.name);
          createCard(data.name, data.sprites.front_default, types);
        });
    });
  });
