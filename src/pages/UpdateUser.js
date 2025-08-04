import { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";
import Mytext from "./components/Mytext";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRoute } from "@react-navigation/native";

const UpdateUser = ({ navigation }) => {
  const route = useRoute()
  const {id, nome} = route.params;
  const [id_autor, setId_autor] = useState(id);
  const [autor, setAutor] = useState(nome)


  async function atualizarAutor(){
    try {
      const atualizar = doc(db, 'Autor', id_autor);
      await updateDoc (atualizar, {nome: autor});
      Alert.alert("Informações", "Autor alterado com sucesso!");
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert("Atenção", "Erro ao alterar autor!")
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <Mytext text="Filtro de Autor" />
              <Mytextinput
                placeholder="Entre com o Nome"
                style={{ padding: 10 }}
                value={autor}
                onChangeText={setAutor}
              />

              <Mybutton title="Atualizar Autor" onPress={atualizarAutor} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;
