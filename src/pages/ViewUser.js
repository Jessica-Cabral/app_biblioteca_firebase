import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  StyleSheet,
  Button,
} from "react-native";
import Mytext from "./components/Mytext";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { db } from "../../firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";

const ViewUser = ({ navigation }) => {
  const [autor, setAutor] = useState("");
  const [listaAutores, setListaAutores] = useState([]);

  async function consultarAutor() {
    try {
      const colecao = collection(db, "Autor");
      const q = query(colecao, where("nome", "==", autor));
      const autores = await getDocs(q);
      const lista = autores.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setListaAutores(lista);
      console.log(listaAutores);
    } catch (error) {
      Alert.alert("Atenção", "Erro ao Buscar autor");
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Nome autor" />
          <Mytextinput
            placeholder="Nome autor"
            style={{ padding: 10 }}
            value={autor}
            onChangeText={setAutor}
          />
          <Mybutton title="Buscar Autor" onPress={consultarAutor} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10,
            }}
          >
            <FlatList
              style={{ marginTop: 30 }}
              contentContainerStyle={{ paddingHorizontal: 5 }}
              data={listaAutores}
              renderItem={({ item }) => (
                <View style={styles.flatList}>
                  <Text> ID: {item.id}</Text>
                  <Text> Nome: {item.nome}</Text>
                  <View style={styles.botoesFlaList}>
                    <Button
                      title="Atualizar"
                      onPress={() =>
                        navigation.navigate("Update", {
                          id: `${item.id}`,
                          nome: `${item.nome}`,
                        })
                      }
                    />
                    <Button
                      title="Excluir"
                      onPress={() =>
                        navigation.navigate("Delete", {
                          id: `${item.id}`,
                        })
                      }
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
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
  botoesFlaList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:15,
    gap:20
  },
});
export default ViewUser;
