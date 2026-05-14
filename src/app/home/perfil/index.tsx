import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, TouchableOpacity, View, Modal, TextInput } from "react-native";
import { style } from "./style";
import { router } from "expo-router";
import { useState, useRef } from "react";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import ViewShot from 'react-native-view-shot';

export default function Perfil() {

  const [visivel, setVisivel] = useState(false);
  const [name, setName] = useState('João Silva');
  const [isEditing, setIsEditing] = useState(false);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const viewShotRef = useRef<any>(null);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert("Precisamos de permissão para acessar suas fotos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveImage = async () => {
    if (viewShotRef.current) {
      const uri = await viewShotRef.current.capture();
      console.log("Imagem processada salva em:", uri);
      setVisivel(false);
    }
  };

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
            <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                  <Image 
                    source={imageUri ? { uri: imageUri } : require("@/assets/template/avatar.png")}
                    style={style.headerProfile}
                  />
            </ViewShot>
            <Text style={style.nomeProfile}>{name}</Text>
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
                  <Text style={style.titleModal}>Editar Perfil</Text>
                  <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                    <Image 
                      source={imageUri ? { uri: imageUri } : require("@/assets/template/avatar.png")}
                      style={{ width: 102, height: 92, borderRadius: 60, marginBottom: 10 }}
                    />
                  </ViewShot>
                  <TouchableOpacity style={style.modalBotao} onPress={pickImage}>
                    <Text style={style.modalText}>Alterar Foto</Text>
                  </TouchableOpacity>

                  {isEditing ? (
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      autoFocus={true}
                      style={style.textInputEdit}
                    />
                  ) : (
                    <Text style={style.textInput}>{name}</Text>
                  )}

                  <TouchableOpacity 
                    onPress={() => setIsEditing(!isEditing)}
                    style={style.modalBotao}
                  >
                    <Text style={style.modalText}>
                      {isEditing ? 'Salvar' : 'Editar Nome'}
                    </Text>
                  </TouchableOpacity>

              <Pressable style={style.modalFechar} onPress={() => setVisivel(false)}><Text style={style.modalText}>fechar</Text></Pressable>
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