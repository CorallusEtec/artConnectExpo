import { Comment } from "@/components/Comment";
import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import ReacaoService from "@/services/ReacaoService";
import { useAuthStore } from "@/store";
import { gStyles } from "@/style/gStyle";
import { Octicons } from "@expo/vector-icons";
import { use } from "react";
import { FlatList, TouchableOpacity } from "react-native";

type CommentListProps = {
    promise: Promise<ComentarioResponse[] | null>
    attComments: () => void;
}

export function CommentList({...props}:CommentListProps) {
    
    const comments = use(props.promise);
    const usuario = useAuthStore((s) => s.usuario);

    async function reagir(commentId: number, tipo: "LIKE" | "DISLIKE") {
        if (!usuario) return;
        await ReacaoService.reagirComentario(commentId, usuario.id, tipo);
        props.attComments();
    }
    
    return (
        <FlatList 
        data={comments}
        keyExtractor={item=>item.id.toString()}
        
        renderItem={({item})=>(
            <Comment.root comentario={item}>
                <Comment.header>
                    <Comment.actions>
                        {/* DENUNCIAR POST */}
                        <TouchableOpacity>
                            <Octicons name="report" color={gStyles.vermelho[200]} size={20} />
                        </TouchableOpacity>
                    </Comment.actions>
                </Comment.header>
                <Comment.content 
                    onLike={() => reagir(item.id, "LIKE")} 
                    onDislike={() => reagir(item.id, "DISLIKE")} 
                />
            </Comment.root>
        )}

        />
    )
}