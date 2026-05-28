import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { gStyles } from "@/style/gStyle";
import EmojiPicker, {pl, pt, type EmojiType} from 'rn-emoji-keyboard';
import { useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { ComentarioService } from "@/services/ComentarioService";
import { ComentarioRequest } from "@/models/request/ComentarioRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";


type CommentInputProps = TextInputProps & {
    postId: undefined | number,
    attComments: () => void
}


export function CommentInput({...props}: CommentInputProps) {
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [commentText, setCommentText] = useState<string>("");
    const [sendDisable, setSendDisable] = useState(true);

    // Tratamento do Type de emoji para envio
    function getEmoji(emoji: EmojiType) {
        write(commentText+emoji.emoji);
    }

    // Handler que checa a entrada e se o estado vai ficar vazio
    function write(char: string) {

        

        setCommentText(char);
        // Se estiver com o input vazio, desabilitar o envio
        if(char.trim() == "") {
            setSendDisable(true);
        } else {
            setSendDisable(false);
        }
    }

    // Função para enviar o comentario
    async function sendComment() {
        const userData = await AsyncStorage.getItem("@artconnect:token");

        if(userData == null) {
            throw new Error("Erro de permissão");
        }
        //transforma de json pra objeto
        const user = JSON.parse(userData);
        const idAutor = user.id //separar apenas id do objeto

            // Remove possíveis espaços em branco em volta do comentario
            commentText.trim()

            // Request
            const comment: ComentarioRequest = {
                idAutor: Number(idAutor),
                mensagem: commentText,
                idPublicacao: props.postId as number
            }
  
            // Envia o comentário
            await ComentarioService.comment(comment);  
            
        // Atualiza os comentarios
        props.attComments();

        // Limpa o input
        setCommentText("");
    }

    return (
        <View style={style.container}>
            <TextInput style={style.input} value={commentText} onChangeText={write} {...props} placeholderTextColor={gStyles.cinza[500]} />
            
            {/* ACTIONS DO INPUT */}
            <View style={style.actionsContainer}>

                <TouchableOpacity onPress={()=>setEmojiOpen(true)}>
                    <Entypo name="emoji-happy" size={18} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>sendComment()} style={sendDisable?style.sendBtnDisable:style.sendBtnEnable} disabled={sendDisable}>
                    <Ionicons style={sendDisable?style.sendIconDisable:style.sendIconEnable} name="send" size={18} />
                </TouchableOpacity>
                <EmojiPicker translation={pt} onEmojiSelected={getEmoji} open={emojiOpen} onClose={()=>setEmojiOpen(false)}/>
            </View>
        </View>
    )
}