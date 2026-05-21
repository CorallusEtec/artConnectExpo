import { gStyles } from "@/style/gStyle"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        
    },
    outField: {
        flex: 0.3
    },
    contentArea: {
        flex: 0.7,
        backgroundColor: gStyles.cinza[0],
        padding: 7
    },

    closeContainer: {
        alignItems: 'flex-start',
        position: "absolute",
        zIndex: 1
    },
    closeIcon: {
        aspectRatio: 1,
        textAlign: "center"

    },
    closeBtn: {
        backgroundColor: gStyles.cinza[100],
        aspectRatio: 1,
        borderRadius: 12,
        padding: 2,
        justifyContent: "center"
    },

    headerContainer: {
        alignItems: "center",
        marginBottom: 20
    }
})