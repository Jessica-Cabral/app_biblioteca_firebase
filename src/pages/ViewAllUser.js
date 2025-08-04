import React, { useState, useEffect } from "react";
import { FlatList, Text, View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const ViewAllUser = () => {
  const [listaAutores, setListaAutores] = useState ([]);
  async function visualizarAutores() {
    try {
      const autores = await getDocs(collection(db, 'Autor'));
      const lista = autores.docs.map(doc =>({id: doc.id,...doc.data()}));
      //quando buscar precisa ter um set para atualizar os dados
      setListaAutores(lista);
      console.log(listaAutores);
    } catch (error) {
      Alert.alert("Informações", "Erro ao visualizar todos os autores")
    }
    
  }

  useEffect(() => {
    visualizarAutores();
  })
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={listaAutores}
            renderItem={({item})=>(
              <View style={styles.flatList}>
                <Text> ID: {item.id}</Text>
                <Text> Nome: {item.nome}</Text>
              </View>

            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: "#111",
    fontSize: 12,
    fontWeight: "700",
  },
  textbottom: {
    color: "#111",
    fontSize: 18,
  },
  flatList: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default ViewAllUser;
