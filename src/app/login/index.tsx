import { InputIcon } from "@/components/InputIcon";
import { InputSenha } from "@/components/InputSenha";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, View, Image, Pressable, Text} from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Redirect } from 'expo-router';
import Checkbox from "expo-checkbox";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Index() {
      const [checked, setChecked] = useState(false);

  return (
    <View style={style.container}>

           <View style={{flexDirection: 'row'}}>
            <Image
                source={require("@/assets/template/bannerLogin.png")}
                style={{width: "100%", height: 300, resizeMode: 'contain',}}
            />
            <Image
                source={require("@/assets/template/onda.png")}
                style={{width: '100%', height: 450, position: 'absolute',resizeMode: 'contain',}}
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

   <Text style={{fontSize: 30, fontWeight: "bold"}}>Login</Text>

      <InputIcon placeholder="Digite o seu Email">
        <FontAwesome name="envelope" size={17} color={gStyles.azul[500]} />
      </InputIcon>

      <InputSenha placeholder="Digite a sua Senha">
        <FontAwesome name="lock" size={24} color={gStyles.azul[500]} />
      </InputSenha>

      <TextButton
        theme="primary"
        title="Login"
        onPress={() => router.navigate("/home")}
      />

      <TextButton
        theme="secondary"
        title="Cadastrar"
        onPress={() => router.navigate("/home")}
      />


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
      <Text style={{ textDecorationLine: "underline" }}>Esqueci a Senha</Text>
      </Pressable>




    </Pressable>



</View>

    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    gap: 10,
    justifyContent: 'flex-start',
    marginTop: -50,


  },
  view1: {
    
    gap: 10,
    alignItems: "center"
  },
  
});
