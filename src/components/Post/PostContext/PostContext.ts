import { PublicacaoResponse } from "@/models/response/PublicacaoResponse";
import { createContext, Dispatch, SetStateAction } from "react";

export type PostContextType = {
    publicacaoData: PublicacaoResponse,
    setPublicacaoData: Dispatch<SetStateAction<PublicacaoResponse>>
}


export const PostContext = createContext<PostContextType>({} as PostContextType);