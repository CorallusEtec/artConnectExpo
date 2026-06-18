import { TipoConta } from "@/models/enumeration/enumeration";

export interface UsuarioPageParams {
    nome?: string,
    tipoConta?: TipoConta,
    cidade?: string,
    uf?: string,
    
}