import { Post } from "@/components/Post";
import { Action } from "@/components/Post/Action";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native";
import { style } from "./style";

export default function Home() {
  const [post, setPost] = useState<any>();
  const [load, setLoad] = useState(true);

  async function getPost() {
    const data = await fetch("https://dummyjson.com/posts");
    return data.json();
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const data = await getPost();
        setPost(data);
        setLoad(false);
      })();
    }, []),
  );

  if (load) return <ActivityIndicator size={"large"} />;

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
        
        <FlatList
          data={post.posts}
          keyExtractor={(post) => post.id}
          contentContainerStyle={{gap: 30}}
          renderItem={({ item }) => (
            <Post.root>
              <Post.header nomePerfil="João" data={new Date("2026-04-16T10:30:00")}>
                <Post.headerActions>
                  <TextButton title="Seguir" theme="secondary" />
                </Post.headerActions>
              </Post.header>
              <Post.legend data={item.body} />
              <Post.actions>
                <Action insight={item.reactions.likes}>
                  <FontAwesome name="heart-o" size={24} color={gStyles.vermelho[400]} />
                </Action>
                <Action insight={item.views}>
                  <Feather name="message-circle" size={24} color={gStyles.cinza[600]} />
                </Action>
              </Post.actions>
            </Post.root>
          )}
        />
        
      </View>
    </>
  );
}

/**
 * 
 * 
 * 
 * 
 * 
 * 
 */
