import { StyleSheet } from "react-native"
import colors from "./../../../../utils/colors"

export default StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    container: {
        flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 35,
        borderRadius: 100,
        overflow: "hidden",
        borderColor: colors.GREEN,
        alignItems: "center"
    },
    text: {
        fontWeight: "300",
        marginLeft: 5
    }
})