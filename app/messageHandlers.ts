import React, { MutableRefObject } from "react";
import { FlatList } from "react-native";
import { Message } from "@/app/MessageItem";
import sampleMessages5 from "@/app/sampleMessages5.json";
import sampleMessages20 from "@/app/sampleMessages20.json";

export const useSendMessage = (
    messages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    inputText: string,
    setInputText: React.Dispatch<React.SetStateAction<string>>,
    flatListRef: MutableRefObject<FlatList<Message> | null>
) => {
    return () => {
        if (inputText.trim() === "") return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText.trim(),
            isUser: true,
        };

        setMessages([...messages, newMessage]);
        setInputText("");

        // Scroll to the bottom after adding new message
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({animated: true});
        }, 100);
    };
};

export const useSendMessageReversed = (
    messages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    inputText: string,
    setInputText: React.Dispatch<React.SetStateAction<string>>,
    flatListRef: MutableRefObject<FlatList<Message> | null>
) => {
    return () => {
        if (inputText.trim() === "") return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText.trim(),
            isUser: true,
        };

        setMessages([...messages, newMessage]);
        setInputText("");

        // Scroll to the top after adding new message for reversed messages
        setTimeout(() => {
            flatListRef.current?.scrollToOffset({offset: 0, animated: true});
        }, 100);
    };
};

export function getMessagesByCount(count: number): Message[] {
    switch (count) {
        case 5:
            return sampleMessages5 as Message[];
        case 20:
            return sampleMessages20 as Message[];
        default:
            return sampleMessages5 as Message[];
    }
}
