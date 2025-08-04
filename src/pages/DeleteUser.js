import React, { useState } from "react";
import { View, Alert, SafeAreaView } from "react-native";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { db } from "../../firebaseConfig";
import { useRoute } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteUser = ({ navigation }) => {
  const route = useRoute();
  const {id} = route.params;
  const [id_autor, setId_autor] = useState (id);

  async function excluirAutor() {
    try {
      const deletar = doc(db, 'Autor', id_autor);
      await deleteDoc(deletar);
      Alert.alert("Informações", "Autor excluído com sucesso!");
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert("Atenção", "Erro ao excluir autor!")
      
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="ID do autor"
            style={{ padding: 10 }}
            value={id_autor}
            onChangeText={setId_autor}
          />
          <Mybutton title="Excluir Autor" onPress={excluirAutor}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;
