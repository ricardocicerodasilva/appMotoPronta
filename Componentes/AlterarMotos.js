import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firestore } from "../Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function AlterarMotos({ navigation, route }) {

    const id = route.params.id;

    const [nomeMoto, setnomeMoto] = useState(route.params.nomeMoto);
    const [montadoraMoto, setmontadoraMoto] = useState(route.params.montadoraMoto);
    const [valorMoto, setvalorMoto] = useState(route.params.valorMoto);


    async function alterarMoto(id, nomeMoto, montadoraMoto, valorMoto) {
        try {
            await updateDoc(doc(collection(firestore, "tbMotos"), id), {
                nomeMoto: nomeMoto,
                montadoraMoto:montadoraMoto,
                valorMoto:valorMoto
            })
            Alert.alert("Aviso", "Moto Alterado com sucesso.")
            navigation.navigate("Home")
        }
        catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }
        return (
            <View style={estilo.container}>
                <View>
                    <Text style={estilo.titulo}> Alterar dados da Criptomoeda </Text>
                </View>
                <View>
                    <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite o nome da moto" onChangeText={setnomeMoto} value={nomeMoto} />
                    <TextInput style={estilo.input} placeholder="Digite a montadora" onChangeText={setmontadoraMoto} value={montadoraMoto} />
                    <TextInput style={estilo.input} placeholder="Digite o valor" onChangeText={setvalorMoto} value={valorMoto} />
                    <TouchableOpacity
                        style={estilo.btnenviar}
                        onPress={() => {
                            alterarMoto(id, nomeMoto,montadoraMoto, valorMoto);
                        }}>
                        <Text style={estilo.btntxtenviar}> Alterar </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    const estilo = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        input: {
            marginVertical: 10,
            marginHorizontal: 10,
            backgroundColor: '#9ac234',
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: 15,
            borderRadius: 10,
        },
        btnenviar: {
            marginTop: 20,
        },
        btntxtenviar: {
            fontSize: 25,
        },
        titulo: {
            marginVertical: 40,
            fontSize: 25,
            textAlign: 'center',
        },
    });