const listUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";

// récupéré de https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
const pokemonTypesColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const cards = document.querySelector(".cards");
const loaderContainerElt = document.querySelector(".loader-container");
const paginationElt = document.querySelector(".pagination");

function createAndAppendElement(elementType, parentElt, classesString) {
  const classes = classesString.split(" ");
  const elt = document.createElement(elementType);
  classes.forEach((eltClass) => {
    elt.classList.add(eltClass);
  });
  parentElt.appendChild(elt);
  return elt;
}

function createAndAppendTextElement(
  elementType,
  parentElt,
  text,
  classes = []
) {
  const elt = createAndAppendElement(elementType, parentElt, classes);
  elt.textContent = text;
  return elt;
}

function createCardHeader(cardElt, imageUrl) {
  const cardHeader = createAndAppendElement("div", cardElt, "card-header");
  const cardImg = createAndAppendElement("div", cardHeader, "card-img");
  cardImg.style.backgroundImage = `url(${imageUrl})`;
}

function createCardBody(card, title) {
  const cardBodyElt = createAndAppendElement("div", card, "card-body");
  return createAndAppendTextElement("h2", cardBodyElt, title, "card-title");
}

function createPokemonTypesElements(cardBodyElt, types) {
  const pokemonTypesElt = createAndAppendElement(
    "ul",
    cardBodyElt,
    "pokemon-types"
  );

  types.forEach((pokemonType) => {
    const pokemonTypeElt = createAndAppendTextElement(
      "li",
      pokemonTypesElt,
      pokemonType,
      "pokemon-type"
    );
    pokemonTypeElt.style.backgroundColor = pokemonTypesColors[pokemonType];
  });
}

function createCard(title, imageUrl, types) {
  const card = createAndAppendElement("div", cards, "card");

  createCardHeader(card, imageUrl);

  const cardBodyElt = createCardBody(card, title);

  createPokemonTypesElements(cardBodyElt, types);
}

function hideLoader() {
  loaderContainerElt.classList.add("hidden");
}

function showPagination() {
  paginationElt.classList.add("shown");
}

function createAndShowPagination(totalElements, itemsPerPage, selectedPageNumber) {
  const nbPages = Math.floor(totalElements / itemsPerPage);
  createAndAppendTextElement(
    "button",
    paginationElt,
    "<",
    "pagination-element pagination-arrow pagination-arrow-left"
  );

  for (let i = 0; i < nbPages; i++) {
    const paginationNumberElt = createAndAppendTextElement(
      "button",
      paginationElt,
      i + 1,
      "pagination-element pagination-number"
    );
    if (selectedPageNumber === i + 1) {
      paginationNumberElt.classList.add("active");
    }
  }

  createAndAppendTextElement(
    "button",
    paginationElt,
    ">",
    "pagination-element pagination-arrow pagination-arrow-right"
  );

  showPagination();
}

fetchData(listUrl, 1500).then((listData) => {
  console.log(listData);
  const pokemons = listData.results;

  Promise.all(pokemons.map((pokemon) => fetchData(pokemon.url))).then(
    (pokemonsData) => {
      const sortedPokemonsData = pokemonsData.sort(
        (pokemonA, pokemonB) => pokemonA.id < pokemonB.id
      );

      sortedPokemonsData.forEach((pokemonData) => {
        const types = pokemonData.types.map((type) => type.type.name);
        createCard(
          `#${pokemonData.id} ${pokemonData.name}`,
          pokemonData.sprites.front_default,
          types
        );
      });

      hideLoader();
      createAndShowPagination(150, 10, 1);
    }
  );
});

async function fetchData(url, timeout = 0) {
  const json = await fetch(url).then((response) => response.json());
  return new Promise((resolve) => setTimeout(() => resolve(json), timeout));
}
