import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./style";

export default function tipoArte() {

    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Música', value: 'musica'},
    {label: 'Teatro', value: 'teatro'},
    {label: 'Pintura', value: 'pintura'},
    {label: 'Stand-up', value: 'stand-up'},
    {label: 'Dança', value: 'dança'}
  ]);

  return (

    <SafeAreaView style={style.container}>

        <Pressable
            onPress={() => router.navigate("/cadastro")} 
            style={{position: 'absolute', backgroundColor: 'white', borderRadius: 25, top: 10, left: 10}}>
                <FontAwesome6 name="circle-arrow-left" 
                    size={35} 
                    color={gStyles.azul[200]} 
                />
        </Pressable>
        
        <View style={style.textContainer}>
            <Text style={style.titulo}>  Olá, ****** </Text>
            <Text style={style.subTitulo}>  Bem vindo ao Art Connect! </Text>
            <Text style={style.subTitulo}>  Crie seu portfólio artístico e nós te conectamos a contratantes. </Text>
        </View>
    


        <View style={[style.bottomPage, open && {marginBottom: 100}]}>
            <Text style={style.label}> Qual o seu tipo de arte? </Text>
            <View style={style.pickerContainer}>
                <View>
                    <Text style={style.label}> Tipo de arte </Text>
                            
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        listMode="SCROLLVIEW"
                        style={style.picker}
                        maxHeight={200}
                        placeholder="Selecione um tipo de arte"
                        dropDownContainerStyle={{width:'100%', backgroundColor: gStyles.cinza[200], borderColor: gStyles.cinza[200]}}
                    />
                </View>
            </View>
        </View>

        <View style={style.btnContainer}>
            <View style={style.btnWrapper}>
                <TextButton
                    theme="primary"
                    title="Criar conta"
                    onPress={() => router.navigate("/home")}
                />
            </View>
        </View>

    </SafeAreaView>

  );
}
