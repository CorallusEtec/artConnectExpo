import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { use } from "react";
import { FlatList, Text, View } from "react-native";

type CommentAreaProps = {
    promise: Promise<ComentarioResponse[]>
}

export function CommentArea({...props}:CommentAreaProps) {
    
    const comments = use(props.promise);
    
    
    return (
        <FlatList 
        data={comments}
        keyExtractor={item=>item.id.toString()}
        
        renderItem={({item})=>(
            <View>
                <Text>{item.mensagem}</Text>
            </View>
        )}

        />
    )
}