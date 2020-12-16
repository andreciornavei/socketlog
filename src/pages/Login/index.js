import React, { useRef, useContext, useState, useReducer } from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "./styles"
import { Form } from '@unform/mobile';
import AppContext from "./../../context"
import colors from "./../../utils/colors"
import Input from "./components/Input"
import Button from "./components/Button"
import { FlatList } from "react-native-gesture-handler";

const Login = () => {

    const { getService } = useContext(AppContext)
    const [error, setError] = useState(undefined)
    const [enabledLogin, setEnabledLogin] = useState(true)
    const [labelLogin, setLabelLogin] = useState("Login")
    const formRef = useRef(null);

    const [logs, pushLog] = useReducer((logs, message) => {
        return [message, ...logs];
    }, []);

    const onConnect = (socket) => {
        pushLog(`Listening for "socketlog" event...`)
        getService("socket").subscribe("socketlog", (data) => {
            pushLog(`SOCKET: ${data}`)
        })
        socket.on('connect', () => { pushLog("SOCKET_EVENT: connected") });
        socket.on('disconnect', () => { pushLog("SOCKET_EVENT: disconnect") });
        socket.on('error', () => { pushLog("SOCKET_EVENT: error") });
        // socket.on('connect_error', () => { pushLog("SOCKET_EVENT: connect_error") });
        // socket.on('connect_timeout', () => { pushLog("SOCKET_EVENT: connect_timeout") });
        // socket.on('reconnect', () => { pushLog("SOCKET_EVENT: reconnect") });
        // socket.on('reconnect_attempt', () => { pushLog("SOCKET_EVENT: reconnect_attempt") });
        // socket.on('reconnecting', () => { pushLog("SOCKET_EVENT: reconnecting") });
        // socket.on('reconnect_error', () => { pushLog("SOCKET_EVENT: reconnect_error") });
        // socket.on('reconnect_failed', () => { pushLog("SOCKET_EVENT: reconnect_failed") });
    }

    const handleSubmit = (data) => {
        setEnabledLogin(false)
        setLabelLogin("Connecting...")
        setError(undefined)
        getService("api").auth("login", {
            username: data.email,
            password: data.password,
            onSuccess: (jwt) => {
                pushLog(`HTTP: Auth success JWT(${jwt})`)
                getService("socket").connect(jwt, onConnect)
                setEnabledLogin(true)
                setLabelLogin("Login")
            },
            onError: (error) => {
                setEnabledLogin(true)
                setLabelLogin("Login")
                pushLog(`HTTP: ${error.message}`)
            },
            dispachMessage: (message) => {
                pushLog(message)
            }
        })
    }



    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <SafeAreaView style={styles.form}>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            name="email"
                            placeholder="email"
                            keyboardType="email-address"
                            type="email"
                        />
                        <Input
                            name="password"
                            placeholder="password"
                            type="password"
                            secureTextEntry={true}
                        />
                        <Button
                            label={labelLogin}
                            center={true}
                            shadow={true}
                            disabled={enabledLogin}
                            onPress={() => formRef.current.submitForm()}
                            containerStyle={{ backgroundColor: colors.GREEN, marginTop: 15 }}
                            textStyle={{ color: colors.WHITE, fontWeight: "bold" }} />
                        {error && <Text>{error}</Text>}
                    </Form>
                </SafeAreaView>
            </View>
            <FlatList
                data={logs}
                contentContainerStyle={styles.logContainer}
                renderItem={(row) => <View style={{borderBottomWidth: 1, borderBottomColor: colors.GRAY, borderStyle: "solid", paddingBottom: 10, paddingTop: 10}}><Text style={{ color: colors.WHITE }}>{row.item}</Text></View>}
                keyExtractor={(item, index) => `log-item-${index}`}
            />
        </View>
    )
}

export default Login