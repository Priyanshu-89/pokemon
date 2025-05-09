import { useEffect, useState } from "react";
import PokemonCards from "./PokemonCards";
import './PokemonCards.css';

const Pokemon = () => {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")


    const API="https://pokeapi.co/api/v2/pokemon?limit=24";

    const fetchPokemon=async()=>{
        try {
            const res=await fetch(API);
            const data=await res.json();
            // console.log(data)

            const detailedPokemonData=data.results.map(async(curpokemon)=>{
                // console.log(curpokemon.url)
                const res=await fetch(curpokemon.url);
                const data=await res.json();
                // console.log(data)
                return data
            })
            // console.log(detailedPokemonData)
            const detailedResponses=await Promise.all(detailedPokemonData)
            // console.log(detailedResponses)
            setPokemon(detailedResponses)
            setLoading(false)
           
        } catch (error) {
            console.log(error)
            setLoading(false)
             setError(error)
        }
    }
   useEffect(()=>{
     fetchPokemon()
   }, []);

// search functionality

const searchData=pokemon.filter((curPokemon)=> curPokemon.name.toLowerCase().includes(search.toLowerCase()))

   if(loading){
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
   };

   if(error){
    return (
        <div>
            <h1>{error.message}</h1>
        </div>
    )
   };
  return (
    <>
     <section className="container">
        <header>
            <h1>Let's Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
            <input type="text" placeholder="Search Pokemon" value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <div>
            <ul className="cards">
                {
                    // pokemon.map((curpokemon)=>{
                        searchData.map((curpokemon)=>{
                        return <PokemonCards key={curpokemon.id} pokemonData={curpokemon}/>
                    })
                }
            </ul>
        </div>
     </section>
    </>
  )
}

export default Pokemon
