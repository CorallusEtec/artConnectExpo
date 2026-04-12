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

export default function Cadastro() {

    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Masculino', value: 'm'},
    {label: 'Feminino', value: 'f'},
    {label: 'Não binário', value: 'n'},
    {label: 'Prefiro não informar', value: ''}
  ]);

  return (

    <SafeAreaView style={style.container}>
        

        <View style={{flexDirection: 'row'}}>
            <Image
                source={require("@/assets/template/bannerLogin.png")}
                style={{width: '100%', height: 200}}
            />
            <Image
                source={require("@/assets/template/onda.png")}
                style={{width: '100%', height: 350, position: 'absolute'}}
            />
            <Pressable
            onPress={() => router.navigate("/home")} 
            //mudar rota para login quando tiver a tela
            style={{position: 'absolute', backgroundColor: 'white', borderRadius: 25, top: 10, left: 10}}>
                <FontAwesome6 name="circle-arrow-left" 
                    size={35} 
                    color={gStyles.azul[200]} 
                    />
            </Pressable>
        </View>
        
        <View>
        <View style={style.titleContainer}>
            <Text style={style.titulo}> Cadastre-se </Text>
        </View>

        <ScrollView>
            <View style={{gap:20}}>
            <View style={style.inputContainer}>

                <View style={style.inputWrapper}>
                    <Text style={style.label}> Nome </Text>
                    <InputIcon placeholder="  Digite seu nome">
                        <FontAwesome name="user" size={24} color={gStyles.azul[200]} />
                    </InputIcon>
                </View>

                <View style={style.inputWrapper}>
                    <Text style={style.label}> Email </Text>
                    <InputIcon placeholder="  Digite seu email">
                        <FontAwesome name="envelope" size={24} color={gStyles.azul[200]} />
                    </InputIcon>
                </View>

                <View style={style.inputWrapper}>
                    <Text style={style.label}> Senha </Text>
                    <InputSenha placeholder="Crie sua senha">
                        <FontAwesome name="lock" size={24} color={gStyles.azul[200]} />
                    </InputSenha>
                </View>

                <View style={style.inputWrapper}>
                    <Text style={style.label}> Confirmar senha </Text>
                    <InputSenha placeholder="Digite a senha novamente">
                        <FontAwesome name="lock" size={24} color={gStyles.azul[200  ]} />
                    </InputSenha>
                </View>

                <View>
                    <Text style={style.label}> Selecione seu gênero </Text>
                    
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        listMode="SCROLLVIEW"
                        style={style.picker}
                        placeholder="Selecione um gênero"
                        dropDownContainerStyle={{width:'80%', backgroundColor: gStyles.cinza[200], borderColor: gStyles.cinza[200],}}
                        />
                </View>

            </View>

            {/* botoes */}
            <View style={style.btnContainer}>
                <View style={style.btnWrapper}>
                    <TextButton
                        theme="primary"
                        title="Cadastrar"
                        onPress={() => router.navigate("/home")}
                    />
                </View>

                <View style={style.btnWrapper}>
                    <TextButton
                        theme="secondary"
                        title="Já tenho login"
                        onPress={() => router.navigate("/home")}
                    />
                </View>
            </View>
        </View>
        </ScrollView>
        </View>

    </SafeAreaView>

  );
}
