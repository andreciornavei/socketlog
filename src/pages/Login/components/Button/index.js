import React from "react"
import { View, Text, Image } from "react-native"
import Ripple from "react-native-advanced-ripple"
import styles from "./styles"
import colors from "./../../../../utils/colors"
import { Feather } from "@expo/vector-icons"

const Button = ({
    label = "Hello World",
    containerStyle = {},
    textStyle = {},
    onPress,
    bordered = false,
    icon,
    image,
    wrap = false,
    center = false,
    shadow = false
}) => {

    const centerStyle = { justifyContent: "center", paddingLeft: 35 }
    const padAdjust = { paddingLeft: !center && !icon && !image ? 25 : (icon || image) ? 10 : 35 }
    const borderStyle = {
        borderWidth: 2
    }
    const shadowStyle = {
        shadowColor: colors.DARK,
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    }

    return (
        <View style={wrap ? styles.wrapper : {}}>
            <Ripple
                containerStyle={[
                    styles.container,
                    bordered ? borderStyle : {},
                    shadow ? shadowStyle : {},
                    center ? centerStyle : padAdjust,
                    containerStyle
                ]}
                duration={250}
                slowDuration={250}
                onPress={onPress}
            >
                {image && <Image source={image} style={{ width: 16, height: 16 }} fadeDuration={0} />}
                {icon && <Feather name={icon} size={16} color={colors.DARK} />}
                <Text style={[styles.text, textStyle, { marginLeft: (icon||image) ? center ? 10 : 5 : 0 }]}>{label}</Text>
            </Ripple>
        </View >
    )
}

export default Button