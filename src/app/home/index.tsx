import { Post } from "@/components/Post";
import { Action } from "@/components/Post/Action";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import { style } from "./style";

export default function Home() {
  return (
    <View style={style.container}>
      <Post.root>
        <Post.header nomePerfil="Samuel">
          <Post.headerActions>
            <TextButton title="Seguir" theme="secondary" />
          </Post.headerActions>
        </Post.header>
        <Post.legend data="Ola Mundo" />
        <Post.image url="https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg" />
        <Post.actions>
          <Action>
            <FontAwesome name="heart-o" size={22} color={gStyles.cinza[500]} />
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
  );
}
