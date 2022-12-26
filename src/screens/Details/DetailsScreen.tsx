import React, {useEffect, useState} from 'react';
import {Text, View , Image} from "react-native";
import {DetailsScreenProps} from "../types";
import {api, Pokemon} from "../../api/api";

export const DetailsScreen = ({route}: DetailsScreenProps) => {
  const {url} = route.params
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    console.log(11)
    api.getPokemonById(url).then((res) => {
      console.log(res.data.sprites.other)
      setCurrentPokemon(res.data)
    })
  }, [])

  return (
    <View style={{flex: 1}}>
      {currentPokemon && <View>
        <Text>{currentPokemon.name}</Text>
        <Image
          style={{width:250, height:250}}
          source={{uri:currentPokemon.sprites.other["official-artwork"].front_default}}
        />
      </View>}

    </View>
  );
};
