import { ActivityIndicator, Modal, ModalProps, Pressable, Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { gStyles } from "@/style/gStyle";
import { CommentInputBar } from "./CommentInputBar";
import { Suspense } from "react";
import { CommentList } from "./CommentList";
import { ComentarioService } from "@/services/ComentarioService";

type CommentsProps = ModalProps & {
    setModalStatus: (status: boolean) => void,
    postId: undefined |number
};

export function CommentSection({ ...props }: CommentsProps) {

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
                    
                    <CommentInputBar />
                    <Suspense fallback={<ActivityIndicator size={"large"} />}>
                        <CommentList promise={commentsPromise} />
                    </Suspense>
                </View>
            </View>
        </Modal>
  );
}
