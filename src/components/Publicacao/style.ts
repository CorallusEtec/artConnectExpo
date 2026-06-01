import { StyleSheet } from "react-native";

export const ICON_SIZE = 20;

export const style = StyleSheet.create({
    

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    headerContent: {
        flexDirection: "row",
        gap: 10
    },
    autorLabel: {
        fontWeight: "500",
    },
    publishDateLabel: {
        fontSize: 13,
        fontWeight: "400",
    },
    img: {
        borderRadius: 0,
    },
    actionContainer: {
        flexDirection: "row",   
        alignItems :"center",
    },
    actionInsight: {
        fontSize: 17,
        fontWeight: "600"
    },
    actionIcon: {
        

    },
    cardActionContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})