import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text } from "react-native";
import { style } from "./style"

export default function Index() {

  return (
    <View style={style.container}>

        {/* colocar o banner aqui dps */}

        <View style={style.titleContainer}>
            <Text style={style.titulo}> Cadastre-se </Text>
        </View>

        <View style={style.inputContainer}>

            <View style={style.inputWrapper}>
                <Text style={style.label}> Nome </Text>
                <InputIcon placeholder="  Digite seu nome">
                    <FontAwesome name="user" size={24} color={gStyles.azul[500]} />
                </InputIcon>
            </View>

            <View style={style.inputWrapper}>
                <Text style={style.label}> Email </Text>
                <InputIcon placeholder="  Digite seu email">
                    <FontAwesome name="envelope" size={24} color={gStyles.azul[500]} />
                </InputIcon>
            </View>

            <View style={style.inputWrapper}>
                <Text style={style.label}> Senha </Text>
                <InputSenha placeholder="Crie sua senha">
                    <FontAwesome name="lock" size={24} color={gStyles.azul[500]} />
                </InputSenha>
            </View>

            <View style={style.inputWrapper}>
                <Text style={style.label}> Confirmar senha </Text>
                <InputSenha placeholder="Digite a senha novamente">
                    <FontAwesome name="lock" size={24} color={gStyles.azul[500]} />
                </InputSenha>
            </View>

            {/* adicionar botão de selecionar genero mais tarde*/}

        </View>

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
