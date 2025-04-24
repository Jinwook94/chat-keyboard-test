import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { MessageCountProvider } from "./MessageContext";

export default function RootLayout() {
    return (
        <KeyboardProvider>
            <MessageCountProvider>
                <Stack/>
            </MessageCountProvider>
        </KeyboardProvider>
    );
}
