import axios from "axios";

const BASE_URL = 'https://pokeapi.co/api/v2'

export type PokemonItem = {
  name: string
  url: string
}

export type  Pokemon = {
  id: number
  name: string
  sprites: {
    other: {
      'official-artwork': {
        'front_default': string
      }
    }
  }
}

const instance = axios.create({baseURL: BASE_URL})

export const api = {
  getAllPokemon() {
    return instance.get<{results:PokemonItem[]}>('pokemon')
  },
  getPokemonById(url:string) {
    // к нам приходит весь url , поэто мы replace вырезаем базовый урл и подставляем пустую строку
    return instance.get<Pokemon>(url.replace(BASE_URL,''))
  },

}