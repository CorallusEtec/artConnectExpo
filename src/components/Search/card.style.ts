import { gStyles } from "@/style/gStyle"
import { StyleSheet } from "react-native"
export const style = StyleSheet.create({
    card: {
        backgroundColor: "#C4C4C4",
        borderRadius: 16,
        marginBottom: 12,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    avatar: {
        marginRight: 16,
        backgroundColor: "#E0E0E0"
    },
    infoContainer: {
        flex: 1,
        gap: 2,
    },
    nome: {
        fontWeight: "bold",
        color: "#333",
    },
    sub: {
        color: "#444",
    },
    tag: {
        color: "#0B31A3",
        fontWeight: "bold",
        marginTop: 4,
    },
})