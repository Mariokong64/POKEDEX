const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

//Primero creamos un array
const request = [];

//Luego hacemos un for para que se repita 1017 veces que es el número de pokemon que hay en la API y los vamos metiendo al array
for (let i = 1; i <= 1017; i++) {
  request.push(
    fetch(URL + i)
      .then((response) => response.json())
  );
}

//Aquí se pasan todos los datos del array a la función para mostrarlos en la pantalla, pero solo hasta que se obtuvieron todas las solicitudes 
Promise.all(request)
  .then((pokemones) => {
    pokemones.forEach((poke) => mostrarPokemon(poke));
  });

//Aquí se muestra cada pokemon en la pantalla creando un div con todos los datos que se necesitan para cada uno
function mostrarPokemon(poke) {
  let tipos = poke.types.map(
    (type) => `<p class="${type.type.name}" tipo">${type.type.name}</p>`
  );
  tipos = tipos.join("");

  let pokeId = poke.id.toString();
  if (pokeId.length == 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length == 2) {
    pokeId = "0" + pokeId;
  }

  //Aqui hacemos las operaciones para mostrar las características correctas
  let height = poke.height *10;
  let weight = poke.weight /10;

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `

    <p class="pokemon-id-back">#${pokeId}</p>

    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>

    <div class="pokemon-info">

        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>

        <div class="pokemon-tipos">
            ${tipos}
        </div>

        <div class="pokemon-stats">
            <p class="stat">${height}cm</p>
            <p class="stat">${weight}kg</p>
        </div>

    </div>
    `;
  listaPokemon.append(div);
}

//Aquí ponemos la funcionalidad de los botones del menu para filtrar a los pokes por tipo
botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    pokemones.forEach((poke) => {
      if (botonId === "ver-todos") {
        mostrarPokemon(poke);
      } else {
        const tipos = poke.types.map((type) => type.type.name);
        if (tipos.some((tipo) => tipo.includes(botonId))) {
          mostrarPokemon(poke);
        }
      }
    });
  })
);
