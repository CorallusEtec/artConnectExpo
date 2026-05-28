import { ComentarioService } from "@/services/ComentarioService";
import { gStyles } from "@/style/gStyle";
import { Ionicons } from "@expo/vector-icons";
import { Suspense, useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, ModalProps, Pressable, Text, TouchableOpacity, View } from "react-native";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import { style } from "./style";

type CommentsProps = ModalProps & {
    setModalStatus: (status: boolean) => void,
    postId: undefined | number
};

export function CommentSection({ ...props }: CommentsProps) {

    // Estado com a promise da lista de comentarios
    const [commentsPromise, setCommentsPromise] = useState(()=>ComentarioService.findByPost(undefined));

    // Função que cria uma nova promise e atualiza o state
    function attComments() {
        const novaPromise = ComentarioService.findByPost(props.postId)
        
        setCommentsPromise(novaPromise);
    }

    //Toda vez que o modal fechar ou mudar a visibilidade, uma nova promise é gerada 
    useEffect(()=>{
        attComments()
    }, [props.visible])

    
  return (
        <Modal animationType="slide" transparent {...props}>
            <View style={style.container}>
                <Pressable style={style.outField} onPress={()=>props.setModalStatus(false)}>
                 {/* AREA QUE O USUARIO PODE CLICAR PARA FECHAR OS COMENTÁRIOS DIRETAMENTE */}
                </Pressable>
                <View style={style.contentArea}>
                    <View style={style.closeContainer}>
                        <TouchableOpacity style={style.closeBtn} onPress={()=>props.setModalStatus(false)}>
                            <Ionicons style={style.closeIcon} size={24} name="close" color={gStyles.cinza[600]} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.headerContainer}>
                        <Text>Comentários</Text>
                    </View>

                    {/* BARRA DE INPUT */}
                    <View style={style.InputBarcontainer}>
                        {/* SUBSTITUIR PELA FOTO DO USUARIO */}
                        <View style={style.imgUsuarioContainer}>
                            <Image
                            style={style.imgUsuario}
                            source={require("@/assets/template/avatar.png")}
                            />
                        </View>
                        <View style={style.inputContainer}>
                            <CommentInput attComments={attComments} postId={props.postId} placeholder="Escreva seu comentário" />
                        </View>
                    </View>


                    <Suspense fallback={<ActivityIndicator size={"large"} />}>
                        <CommentList promise={commentsPromise} attComments={attComments} />
                    </Suspense>
                </View>
            </View>
        </Modal>
  );
}
