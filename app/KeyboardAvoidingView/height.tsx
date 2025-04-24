import React, { useRef, useState } from "react";
import {
    FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Message, MessageItem } from "@/app/MessageItem";
import { getMessagesByCount, useSendMessage} from "@/app/messageHandlers";
import { useMessageCount } from "@/app/MessageContext";

export default function HeightScreen() {
    const insets = useSafeAreaInsets();
    const { messageCount } = useMessageCount();
    const [messages, setMessages] = useState<Message[]>(getMessagesByCount(messageCount));
    const [inputText, setInputText] = useState("");
    const flatListRef = useRef<FlatList<Message>>(null);

    const handleSendMessage = useSendMessage(
        messages,
        setMessages,
        inputText,
        setInputText,
        flatListRef
    );

    return (
        <>
            {/* Header */}
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <View style={{alignItems: "center"}}>
                            <Text style={{fontSize: 17, fontWeight: "600"}}>KeyboardAvoidingView</Text>
                            <Text style={{fontSize: 12, color: "#666"}}>height | Start with top</Text>
                        </View>
                    ),
                }}
            />

            {/* Message list + Message input bar */}
            <View style={{flex: 1, paddingBottom: insets.bottom}}>
                <KeyboardAvoidingView
                    behavior="height"
                    style={{flex: 1}}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                >
                    {/* Message list */}
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={({item}) => <MessageItem item={item}/>}
                        keyExtractor={(item) => item.id}
                        style={{flex: 1, paddingHorizontal: 10}}
                        contentContainerStyle={{paddingTop: 10, paddingBottom: 10}}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={messages.length}
                    />

                    {/* Message input bar */}
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#FFFFFF",
                        padding: 8
                    }}>
                        {/* Text input field */}
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message..."
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                        />

                        {/* Send button */}
                        <TouchableOpacity
                            style={[styles.sendButton, {opacity: !inputText ? 0.5 : 1}]}
                            onPress={handleSendMessage}
                            disabled={!inputText}
                        >
                            <Ionicons
                                name="send"
                                size={24}
                                color={!inputText ? "#B0B0B0" : "#007AFF"}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        maxHeight: 100,
        fontSize: 15
    },
    sendButton: {
        padding: 8,
        marginLeft: 4
    }
});
