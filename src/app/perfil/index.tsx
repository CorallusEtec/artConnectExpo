import { Post } from "@/components/Post";
import { Action } from "@/components/Post/Action";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { style } from "./style";

export default function Perfil() {
  const [post, setPost] = useState([]);

  useEffect(() => {}, []);

  async function getPosts() {
    const data = await fetch("https://jsonplaceholder.typicode.com/");
  }

  return (
    <>
      <View style={style.navbarMom}>
        <View style={style.navbarSon1}>
          <TouchableOpacity>
            <FontAwesome5 name="arrow-left" color={gStyles.cinza[600]} size={30} />
          </TouchableOpacity>
        </View>
        <View style={style.navbarSon2}>
          <TouchableOpacity>
            <Feather name="send" color={gStyles.cinza[600]} size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="menu" color={gStyles.cinza[600]} size={40} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.container}>

        <View style={style.profile}>
          <Image
            style={style.headerProfile}
            source={require("@/assets/template/avatar.png")}
          />
          <Text style={style.nomeProfile}>Nome do perfil</Text>
        </View>
        <View style={style.infosProfile}>
          <View style={style.infoDuo}>
            <Text style={style.info}>Posts</Text>
            <Text style={style.info}>0</Text>
          </View>
          <View style={style.infoDuo}>
            <Text style={style.info}>Seguidores</Text>
            <Text style={style.info}>0</Text>
          </View>
          <View style={style.infoDuo}>
            <Text style={style.info}>Seguindo</Text>
            <Text style={style.info}>0</Text>
          </View>
        </View>
        <TextButton title="Editar perfil"/>

        <View style={style.users}>
          <Image
              style={style.user}
              source={require("@/assets/template/avatar.png")}
          />
          <Image
              style={style.user}
              source={require("@/assets/template/avatar.png")}
          />
          <Image
              style={style.user}
              source={require("@/assets/template/avatar.png")}
          />
          <Image
              style={style.user}
              source={require("@/assets/template/avatar.png")}
          />
          <Image
              style={style.user}
              source={require("@/assets/template/avatar.png")}
          />
          <Image
              style={style.user}
              source={require("@/assets/template/avatar.png")}
          />
          <Image
              style={style.user}
              source={require("@/assets/template/avatar.png")}
          />
          <Image
              style={style.user}
              source={require("@/assets/template/avatar.png")}
          />
          <Image
              style={style.user}
              source={require("@/assets/template/avatar.png")}
          />
          <Image
              style={style.user}
              source={require("@/assets/template/avatar.png")}
          />
        </View>

          <View style={style.icons}>
            <Feather name="camera" color={gStyles.cinza[600]} size={32.5} />
            <Feather name="bookmark" color={gStyles.cinza[600]} size={35} />
          </View>

          <View style={style.posts}>
            <Image
                style={style.thumb}
                source={require("@/assets/template/avatar.png")}
            />
            <Image
                style={style.thumb}
                source={require("@/assets/template/avatar.png")}
            />
            <Image
                style={style.thumb}
                source={require("@/assets/template/avatar.png")}
            />
          </View>

      </View>
    </>
  );
}
