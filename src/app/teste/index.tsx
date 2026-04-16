import { View, Text, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';

import { useState } from "react";
import { Picker } from '@react-native-picker/picker';

export default function TipoArte() {
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
    const [selectedArt, setSelectedArt] = useState();

    return (
        <View style={{ flex: 1, flexDirection: "column" }}>

            {/* TÍTULO */}
            <View style={{ flex: 0.9, flexDirection: "column", backgroundColor: "#ffffff" }}>
                
                <View style={{ alignItems: "center", marginBottom: 8, marginTop: 40 }}>
                    <Text style={{ fontSize: 32, color: "#6b7280", margin: 10 }}>
                        Olá Fulano
                    </Text>

                    <Text style={{ fontSize: 20, textAlign: "center", color: "#6b7280" }}>
                        Bem vindo ao Art Connect!
                    </Text>

                    <Text style={{
                        fontSize: 20,
                        width: "85%",
                        textAlign: "center",
                        color: "#6b7280",
                        marginBottom: 80
                    }}>
                        Crie seu portifólio artístico e nós te conectamos com contratantes.
                    </Text>
                </View>

                <Text style={{
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: 16
                }}>
                    Qual é o seu tipo de arte?
                </Text>

                <Text style={{
                    fontSize: 18,
                    marginLeft: 80,
                    color: "#1f2937"
                }}>
                    Tipo de arte
                </Text>

                <View style={{
                    flexDirection: "row",
                    width: "60%",
                    backgroundColor: "#e5e7eb",
                    borderColor: "#d1d5db",
                    borderWidth: 2,
                    borderRadius: 8,
                    marginBottom: 40,
                    marginLeft: 80,
                    marginRight: 12,
                    marginTop: 8,
                    gap: 8
                }}>
                    <Picker
                        style={{
                            marginLeft: 16,
                            width: "90%",
                            fontSize: 18,
                            color: "#6b7280",
                            backgroundColor: "#e5e7eb"
                        }}
                        selectedValue={selectedArt}
                        onValueChange={(itemValue) =>
                            setSelectedArt(itemValue)
                        }>
                        <Picker.Item label="Pintura" value="Pintura" />
                        <Picker.Item label="Teatro" value="Teatro" />
                        <Picker.Item label="Música" value="Música" />
                        <Picker.Item label="Literatura" value="Literatura" />
                    </Picker>
                </View>

                {/* BOTÃO */}
                <View style={{ alignItems: "center", marginTop: 24 }}>
                    <Pressable
                        style={{
                            marginTop: 40,
                            borderRadius: 8,
                            backgroundColor: "#04CBAC",
                            padding: 12,
                            width: "50%"
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            color: "#ffffff",
                            textAlign: "center"
                        }}>
                            Criar Conta
                        </Text>
                    </Pressable>
                </View>

            </View>
        </View>
    );
}