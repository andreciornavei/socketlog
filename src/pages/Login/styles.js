import { StyleSheet } from "react-native"
import colors from "./../../utils/colors"

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        shadowColor: colors.DARK,
        shadowRadius: 8,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        elevation: 10,
    },
    coverImage: {
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 100,
        overflow: "hidden"
    },
    form: {
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 30,
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingTop: 30,
        paddingBottom: 120
    },
    actions: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 25,
        paddingVertical: 25,
    },
    logContainer: {
        padding: 15,
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: colors.DARK
    }
})