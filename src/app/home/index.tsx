import { Post } from "@/components/Post";
import { Action } from "@/components/Post/Action";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { style } from "./style";

export default function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {}, []);

  async function getPosts() {
    const data = await fetch("https://jsonplaceholder.typicode.com/");
  }

  return (
    <>
      <View style={style.navbar}>
        <Image
          style={style.banner}
          source={require("@/assets/img/banner.png")}
        />
        <TouchableOpacity>
          <AntDesign name="message" color={gStyles.cinza[600]} size={22} />
        </TouchableOpacity>
      </View>
      <View style={style.container}>
        <Post.root>
          <Post.header
            data={new Date("2023-04-10T09:00:00")}
            nomePerfil="Samuel"
          >
            <Post.headerActions>
              <TextButton title="Seguir" theme="secondary" />
            </Post.headerActions>
          </Post.header>
          <Post.legend data="Ola Mundo, Nova foto de perfil" />
          <Post.image url="https://placehold.co/600x400" />
          <Post.actions>
            <Action>
              <FontAwesome
                name="heart-o"
                size={22}
                color={gStyles.cinza[500]}
              />
            </Action>
            <Action>
              <Feather
                name="message-square"
                color={gStyles.cinza[500]}
                size={22}
              />
            </Action>
            <Action>
              <FontAwesome name="send" color={gStyles.cinza[500]} size={22} />
            </Action>
          </Post.actions>
        </Post.root>

        <Post.root>
          <Post.header
            data={new Date("2026-04-08T09:00:00")}
            nomePerfil="Seu Zé"
          >
            <Post.headerActions>
              <TextButton title="Seguir" theme="secondary" />
            </Post.headerActions>
          </Post.header>
          <Post.legend data="Lorem ipsum" />
          <Post.actions>
            <Action>
              <FontAwesome
                name="heart-o"
                size={22}
                color={gStyles.cinza[500]}
              />
            </Action>
            <Action>
              <Feather
                name="message-square"
                color={gStyles.cinza[500]}
                size={22}
              />
            </Action>
            <Action>
              <FontAwesome name="send" color={gStyles.cinza[500]} size={22} />
            </Action>
          </Post.actions>
        </Post.root>
      </View>
    </>
  );
}
