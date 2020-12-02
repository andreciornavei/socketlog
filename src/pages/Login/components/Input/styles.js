import { StyleSheet } from "react-native"
import colors from "./../../../../utils/colors"

export default StyleSheet.create({
    container: {
        flex: 1,
        height: 50,
        minHeight: 50,
        borderBottomWidth: 2,
        borderBottomColor: colors.GREEN,
        marginBottom: 15,
        color: colors.WHITE,
        fontWeight: "bold",
        fontSize: 16
    }
})