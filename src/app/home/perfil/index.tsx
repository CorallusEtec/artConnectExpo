import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { Feather } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image, Pressable, Text, TouchableOpacity, View, Modal, Button } from "react-native";
import { style } from "./style";
import { router } from "expo-router";
import { useState } from "react";

export default function Perfil() {

  const [visivel, setVisivel] = useState(false);

  return (
    <>
      <View style={style.navbarMom}>
        <View style={style.navbarSon1}>
          <TouchableOpacity onPress={() => router.navigate("/home")}>
            <FontAwesome5
              name="arrow-left"
              color={gStyles.cinza[100]}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={style.navbarSon2}>
          <TouchableOpacity>
            <Feather name="send" color={gStyles.cinza[100]} size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="menu" color={gStyles.cinza[100]} size={40} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.container}>
        <View style={style.fundo}>
          <View style={style.profile}>
            <Pressable>
              <Image
                style={style.headerProfile}
                source={require("@/assets/template/avatar.png")}
              />
            </Pressable>
            <Text style={style.nomeProfile}>Nome do perfil</Text>
          </View>
          <View style={style.infosProfile}>
            <View style={style.infoDuo}>
              <Text style={style.info}>Posts</Text>
              <Text style={style.info}>0</Text>
            </View>
            <Pressable>
              <View style={style.infoDuo}>
                <Text style={style.info}>Seguidores</Text>
                <Text style={style.info}>0</Text>
              </View>
            </Pressable>
            <Pressable>
              <View style={style.infoDuo}>
                <Text style={style.info}>Seguindo</Text>
                <Text style={style.info}>0</Text>
              </View>
            </Pressable>
          </View>

        </View>
          
        <Image style={style.onda} source={require("@/assets/img/onda.png")} />
        
        <Pressable >
          <View style={style.botaoEdit}>
            <TextButton onPress={() => setVisivel(true)} style={{width: '30%', backgroundColor: gStyles.azul[500], borderWidth: 3, borderColor: 'white'}} title="Editar perfil" />
          </View>
        </Pressable>

        <Modal
        animationType="fade"
        transparent={true}
        visible={visivel}
        onRequestClose={() => setVisivel(false)}
        >
          <View style={style.shadow}>
            <View style={style.modalView}>
              <Text style={style.modalText}>Modal</Text>
              <Pressable onPress={() => setVisivel(false)}>fechar</Pressable>
            </View>
          </View>
        </Modal>


        <View style={style.icons}>
          <Pressable>
            <Feather name="camera" color={gStyles.cinza[600]} size={32.5} />
          </Pressable>
          <Pressable>
            <Feather name="bookmark" color={gStyles.cinza[600]} size={35} />
          </Pressable>
        </View>

        <View style={style.posts}>
          <Pressable style={{width: '33%'}}>
          <Image
              style={style.thumb}
              source={require("@/assets/img/post1.png")}
            />
          </Pressable>
          <Pressable style={{width: '33%'}}>
            <Image
              style={style.thumb}
              source={require("@/assets/img/post2.png")}
            />
          </Pressable>
          <Pressable style={{width: '33%'}}>
            <Image
              style={style.thumb}
              source={require("@/assets/img/post3.png")}
            />
          </Pressable>
          <Pressable style={{width: '33%'}}>
            <Image
              style={style.thumb}
              source={require("@/assets/img/post3.png")}
            />
          </Pressable>
          <Pressable style={{width: '33%'}}>
            <Image
              style={style.thumb}
              source={require("@/assets/img/post2.png")}
            />
          </Pressable>
          <Pressable style={{width: '33%'}}>
            <Image
              style={style.thumb}
              source={require("@/assets/img/post1.png")}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
}
