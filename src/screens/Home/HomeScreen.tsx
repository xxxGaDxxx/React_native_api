import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {api, PokemonItem} from "../../api/api";
import {NUM_COLUMNS, PADDING, WIDTH} from "../../constants/constants";
import {useAppNavigation} from "../types";


export const HomeScreen = () => {
  const {navigate} = useAppNavigation()
  const [allPokemon, setAllPokemon] = useState<PokemonItem[]>([])


  useEffect(() => {
    api.getAllPokemon().then((res) => {
      setAllPokemon(res.data.results)
    })
  }, [])

  const renderItem: ListRenderItem<PokemonItem> = ({item}) => {
    return <TouchableOpacity onPress={() => {
      navigate('Details', {url: item.url})
    }
    }>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  }

  return (
    <View style={styles.container}>
      <FlatList data={allPokemon} renderItem={renderItem} numColumns={NUM_COLUMNS}
                columnWrapperStyle={{justifyContent: 'space-between'}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING
  },
  item: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    paddingVertical: 10,
    marginVertical: 5,
    width: (WIDTH - PADDING * 2) / NUM_COLUMNS - 5,
  },
  itemText: {
    fontSize: 20,
    textAlign: "center",
  }
})

