import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { routingQueue } from "expo-router/build/global-state/routing";

export interface useQueryProps {
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH" | "HEAD",
    body?: string
}


export async function useQuery(props: useQueryProps): Promise<Response> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    
    const dataToken = await AsyncStorage.getItem("@artconnect:token");
    let token!: AuthLoginResponse;
    if(dataToken) {
        token = JSON.parse(dataToken);
        headers.append("Authorization", `Bearer ${token.token}`);
    }


    const response = await fetch(props.url, {
        method: props.method,
        headers: headers,
        body: props.body
    });

    return response;

}