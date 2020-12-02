import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContext from "./context"
import Login from "./pages/Login"
import services from "./services"

export default function Weace() {
  const getService = (service) => {
    return services[service]
  }
  return (
    <SafeAreaProvider>
      <AppContext.Provider value={{ getService }}>
        <Login/>
      </AppContext.Provider>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}