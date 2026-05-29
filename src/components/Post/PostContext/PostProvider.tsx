import { Children, ReactNode, useState } from "react"
import { PostContext, PostContextType } from "./PostContext"
import { PublicacaoResponse } from "@/models/response/PublicacaoResponse"

type PostProvider = {
    children: ReactNode
}
export function PostProvider({...props}: PostProvider) {
    const [publicacao, setPublicacao] = useState<PublicacaoResponse>({} as PublicacaoResponse);
    
    const value: PostContextType = {publicacaoData: publicacao, setPublicacaoData: setPublicacao}

    return (
        <PostContext.Provider value={value}>
            {props.children}
        </PostContext.Provider>
    )
}