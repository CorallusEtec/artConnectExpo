import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";
import { style } from "./style"
import {Picker} from '@react-native-picker/picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Index() {

  return (
    <View style={style.container}>

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
        
        <View style={style.titleContainer}>
            <Text style={style.titulo}> Cadastre-se </Text>
        </View>

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
                <Picker
                style={style.picker}>
                    <Picker.Item label="Masculino" value="m"/>
                    <Picker.Item label="Feminino" value="f"/>
                    <Picker.Item label="Não binário" value="nb"/>
                    <Picker.Item label="Prefiro não informar" value=""/>
                </Picker>
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
  );
}
