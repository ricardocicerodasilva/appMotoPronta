import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { firestore } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CadastrarMotos({ navigation }) {

    const [nomeMoto, setnomeMoto] = useState(null);
    const [montadoraMoto, setmontadoraMoto] = useState(null);
    const [valorMoto, setvalorMoto] = useState(null);

    async function addMotos() {
        // Validação simples dos campos
        if (!nomeMoto || !montadoraMoto || !valorMoto) {
            Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
            return;
        }

        try {
            const docRef = await addDoc(collection(firestore, 'tbMotos'), {
                nomeMoto: nomeMoto,
                montadoraMoto: montadoraMoto,
                valorMoto: valorMoto
            });
            console.log("Cadastrado com ID: ", docRef.id);
            Alert.alert("Cadastro", "Moto cadastrada com sucesso");
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao cadastrar: ", error);
            Alert.alert("Erro", "Erro ao cadastrar. Por favor, tente novamente.");
        }
    }

    return (
     //   <ImageBackground style={estilo.fundo2} resizeMode="cover" source={require('../assets/refeicao.jpg')}>
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}>Cadastre uma nova Moto</Text>
            </View>
            <TextInput 
                autoCapitalize='words' 
                style={estilo.input} 
                placeholder="Digite o nome da moto" 
                onChangeText={setnomeMoto} 
                value={nomeMoto} 
            />
            <TextInput 
                style={estilo.input} 
                placeholder="Digite a montadora da moto" 
                onChangeText={setmontadoraMoto} 
                value={montadoraMoto} 
            />
            <TextInput 
                style={estilo.input} 
                placeholder="Digite o valor" 
                onChangeText={setvalorMoto} 
                value={valorMoto} 
                keyboardType="numeric" 
            />

            <TouchableOpacity
                style={estilo.btnenviar}
                onPress={()=>{
                    addMotos();
                }}>
                <Text style={estilo.btntxtenviar}>Enviar</Text>
            </TouchableOpacity>
            
        </View>
// </ImageBackground>
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
        width: '90%',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    btnenviar: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    btntxtenviar: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    titulo: {
        marginVertical: 40,
        fontSize: 25,
        textAlign: 'center',
    },
});
