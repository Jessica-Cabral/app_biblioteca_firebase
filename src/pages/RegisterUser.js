import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const RegisterUser = ({ navigation }) => {
  const [autor, setAutor] =useState('');
  const [id_autor, setId_autor] = useState('');

  async function inserirAutor() {
    try {
      const docRef = await addDoc(collection(db, 'Autor'), {
        nome: autor,
      });
      Alert.alert("Informação", "Autor cadastrado com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Erro ao cadastrar autor!");

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
              <Mytextinput
                placeholder="Nome do autor"
                style={{ padding: 10 }}
                value={autor}
                onChangeText={setAutor}
              />

              <Mybutton title="Salvar" onPress={inserirAutor}/>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
