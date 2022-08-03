const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImagem = document.querySelector('.pokemon_imagem')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon = 1
const fetchpokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIResponse.status == 200){
        const data = await APIResponse.json()
        return data 
    }
}
const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Carregando...'
    pokemonNumber.innerHTML = ''
    const data = await fetchpokemon(pokemon)

    if(data){
        pokemonImagem.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] 
        searchPokemon = data.id
    }else{
        pokemonImagem.style.display = 'none'
        pokemonName.innerHTML = 'Não encontrei :('
        pokemonNumber.innerHTML = ''
    }

    
}
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    input.value = ''
})
btnPrev.addEventListener('click', () =>{
    if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
    

})
btnNext.addEventListener('click', () =>{
    searchPokemon += 1
    renderPokemon(searchPokemon)

})
renderPokemon(searchPokemon)
