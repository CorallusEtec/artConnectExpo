import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import {View, Image, Pressable,Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Redirect } from 'expo-router';
import Checkbox from "expo-checkbox";
import { useState } from "react"
import  { style } from "@/app/login/style"


export default function Login() {
      const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView style={style.container}>

           <View style={{flexDirection: 'row'}}>
            <Image
                source={require("@/assets/template/bannerLogin.png")}
                style={{width: "100%", height: 300}}
            />
            <Image
                source={require("@/assets/template/onda.png")}
                style={{width: '100%', height: 450, position: 'absolute'}}
            />

              <Pressable
            onPress={() => router.navigate("/home")} 
            style={{position: 'absolute', backgroundColor: 'white', borderRadius: 25, top: 60, left: 10}}>
                <FontAwesome6 name="circle-arrow-left" 
                    size={35} 
                    color={gStyles.azul[500]} 
                    />
                    </Pressable>

      </View>


     <View style={style.view1}>

      <Text style={{fontSize: 25, fontWeight: "bold"}}>Login</Text>

      <InputIcon style={{width:185}} placeholder="Digite seu Email" >
        <FontAwesome name="envelope" size={17} color={gStyles.azul[500]} />
      </InputIcon>

      <InputSenha style={{width:163}}
        placeholder="Digite sua Senha">
        <FontAwesome name="lock" size={17} color={gStyles.azul[500]}/>
      </InputSenha>

       <Pressable
      onPress={() => setChecked(!checked)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
      >
      <Checkbox
        value={checked}
        onValueChange={setChecked}
        color={checked ? "#2563eb" : undefined}
      />

      <Text>Lembre-se de Mim</Text> 
      <Pressable>
      <Text style={{ textDecorationLine: "underline" }}>Esqueci a Senha</Text></Pressable>
      </Pressable>

      <TextButton
        theme="primary"
        title="Login"
        onPress={() => router.navigate("/home")}
        style={{
        width: "55%", 
        height: "15%",
        justifyContent: "center",
        backgroundColor: "#2563eb",
          }}
      />

      <TextButton
        theme="secondary"
        title="Cadastrar"
        onPress={() => router.navigate("/home")}
        style={{
        width: "55%", 
        height: "15%",
        justifyContent: "center",
          }}
      />

      </View>

    </SafeAreaView>
  );
}

