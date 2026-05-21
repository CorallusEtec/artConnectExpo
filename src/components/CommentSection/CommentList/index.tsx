import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { use } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Comment } from "@/components/Comment";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { gStyles } from "@/style/gStyle";

type CommentListProps = {
    promise: Promise<ComentarioResponse[] | null>
}

export function CommentList({...props}:CommentListProps) {
    
    const comments = use(props.promise);
    
    
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
                <Comment.content />
            </Comment.root>
        )}

        />
    )
}