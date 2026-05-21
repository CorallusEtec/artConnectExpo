import { ActivityIndicator, Modal, ModalProps, Pressable, Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { gStyles } from "@/style/gStyle";
import { CommentWriter } from "./CommentWriter";
import { Suspense } from "react";
import { CommentArea } from "./CommentArea";
import { ComentarioService } from "@/services/ComentarioService";

type CommentsProps = ModalProps & {
    setModalStatus: (status: boolean) => void,
    postId: number
};

export function Comments({ ...props }: CommentsProps) {

    const commentsPromise = ComentarioService.findByPost(props.postId)

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
                    
                    <CommentWriter />

                    <Suspense fallback={<ActivityIndicator size={"large"} />}>
                        <CommentArea promise={commentsPromise} />
                    </Suspense>
                
                </View>
            </View>
        </Modal>
  );
}
