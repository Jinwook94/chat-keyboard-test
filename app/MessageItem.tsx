import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export interface Message {
    id: string;
    text: string;
    isUser: boolean;
    senderName?: string;
    senderAvatar?: string;
}

interface MessageItemProps {
    item: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({item}) => {
    const showAvatar = !item.isUser;
    const maxBubbleWidth = screenWidth * 0.65;

    return (
        <View
            style={[
                styles.messageRow,
                {
                    justifyContent: item.isUser ? "flex-end" : "flex-start",
                    marginTop: 4,
                },
            ]}
        >
            {/* Avatar for non-user messages */}
            {!item.isUser && (
                <View style={styles.avatarContainer}>
                    {showAvatar ? (
                        <Image source={{uri: item.senderAvatar}} style={styles.avatar}/>
                    ) : (
                        <View style={styles.avatarPlaceholder}/>
                    )}
                </View>
            )}

            <View style={styles.messageContentContainer}>
                {/* Sender name for non-user messages and first in sequence */}
                {!item.isUser && <Text style={styles.senderName}>{item.senderName}</Text>}

                <View style={styles.bubbleRow}>
                    {/* Message bubble */}
                    <Pressable>
                        <View
                            style={[
                                styles.messageBubble,
                                item.isUser ? styles.userBubble : styles.otherBubble,
                                {maxWidth: maxBubbleWidth},
                            ]}
                        >
                            <Text style={item.isUser ? styles.userMessageText : styles.otherMessageText}>
                                {item.text}
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageRow: {
        flexDirection: "row",
        marginVertical: 2,
    },
    avatarContainer: {
        width: 36,
        marginRight: 8,
        marginTop: 4,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    avatarPlaceholder: {
        width: 36,
    },
    messageContentContainer: {
        flexDirection: "column",
        maxWidth: "80%",
    },
    senderName: {
        fontSize: 12,
        color: "#666",
        marginBottom: 2,
    },
    bubbleRow: {
        flexDirection: "column",
    },
    messageBubble: {
        padding: 10,
        borderRadius: 18,
        marginBottom: 2,
    },
    userBubble: {
        backgroundColor: "#FEE500",
        borderTopRightRadius: 4,
        alignSelf: "flex-end",
    },
    otherBubble: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 4,
        alignSelf: "flex-start",
    },
    userMessageText: {
        color: "#000",
        fontSize: 15,
    },
    otherMessageText: {
        color: "#000",
        fontSize: 15,
    },
});
