import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestore } from "../Firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import backgroundImage from '../assets/logo.jpg'; // Importa a imagem

export default function Home({ navigation }) {
  const [motos, setMotos] = useState([]);

  async function deleteMotos(id) {
    try {
      await deleteDoc(doc(firestore, "tbMotos", id));
      Alert.alert("A Moto foi deletada.");
    } catch (error) {
      console.error("Erro ao deletar.", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'tbMotos'), (querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({ ...doc.data(), id: doc.id });
      });
      setMotos(lista);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ImageBackground 
      source={backgroundImage} 
      style={estilo.background}
      resizeMode="cover"
    >
      <View style={estilo.container}>
        <View>
          <Text style={estilo.titulo}>Lista de Motos</Text>
        </View>

        <FlatList
          data={motos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={estilo.container}>
                <TouchableOpacity onPress={() => navigation.navigate("Alterar", {
                  id: item.id,
                  nomeMoto: item.nomeMoto,
                  montadoraMoto: item.montadoraMoto,
                  valorMoto: item.valorMoto
                })}>
                  <View style={estilo.itens}>
                    <Text style={estilo.titulo4}> <Text>Moto Cadastrada</Text> </Text>
                    <Text>Moto: <Text>{item.nomeMoto}</Text></Text>
                    <Text>Montadora: <Text>{item.montadoraMoto}</Text></Text>
                    <Text>Valor: <Text>{item.valorMoto}</Text></Text>
                  </View>
                </TouchableOpacity>

                <View style={estilo.botaodeletar}>
                  <TouchableOpacity onPress={() => { deleteMotos(item.id); }}>
                    <Text>DELETAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />

        <TouchableOpacity style={estilo.BtnCadastrar} onPress={() => navigation.navigate("Cadastrar")}>
          <Text style={estilo.cadastrar}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const estilo = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  titulo: {
    marginTop: 50,
    fontSize: 30,
     fontWeight: "bold",
  },
  itens: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
   
   
  },
  titulo4: {
    fontSize: 13,
    color: '#fff',
  },
  cadastrar: {
    fontSize: 15,
    fontWeight: "bold",
  },
  BtnCadastrar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    color: 'white',
  },
  botaodeletar: {
    textAlignVertical: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    
  },
});
