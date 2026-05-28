import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { routingQueue } from "expo-router/build/global-state/routing";

export interface useQueryProps {
    url: string,
    method?: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH" | "HEAD",
    body?: BodyInit
}

export async function useQuery({method="GET", ...props}: useQueryProps): Promise<Response> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    
    
    const dataToken = await AsyncStorage.getItem("@artconnect:token");
    
    let token!: AuthLoginResponse;
    
    if(dataToken) {
        token = JSON.parse(dataToken);
        headers.append("Authorization", `Bearer ${token.token}`);
    }
    if(method=="PUT") {
        headers.append("Accept", 'application/json');
    }

    const response = await fetch(props.url, {
        method: method,
        headers: headers,
        body: props.body
    });

    return response;

}