import {
    Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useMessageCount } from "./MessageContext";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
    const router = useRouter();
    const { messageCount, setMessageCount } = useMessageCount();

    // Define behavior types and their routes
    const behaviors = [
        {
            name: "translate-with-padding",
            routes: {
                normal: "/KeyboardAvoidingView/translate-with-padding",
                reversed: "/KeyboardAvoidingView/translate-with-padding-reversed",
            }
        },
        {
            name: "padding",
            routes: {
                normal: "/KeyboardAvoidingView/padding",
                reversed: "/KeyboardAvoidingView/padding-reversed",
            }
        },
        {
            name: "height",
            routes: {
                normal: "/KeyboardAvoidingView/height",
                reversed: "/KeyboardAvoidingView/height-reversed",
            }
        },
        {
            name: "position",
            routes: {
                normal: "/KeyboardAvoidingView/position",
                reversed: "/KeyboardAvoidingView/position-reversed",
            }
        }
    ];

    // Available message counts - reduced to just 5 and 20
    const messageCounts = [5, 20];

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" />

            <View style={styles.fixedHeader}>
                <Text style={styles.title}>KeyboardAvoidingView Test</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.techStackContainer}>
                    <Text style={styles.techStackTitle}>Test Environment</Text>
                    <View style={styles.techStackContent}>
                        <Text style={styles.techStackItem}>• React Native: v0.76.9 | Expo: ~52.0.46</Text>
                        <Text style={styles.techStackItem}>• react-native-keyboard-controller: ^1.17.1</Text>
                    </View>
                </View>

                {/* Message Count Selector - horizontal layout */}
                <View style={styles.messageCountContainer}>
                    <View style={styles.messageCountHeader}>
                        <Text style={styles.messageCountTitle}>Message Count</Text>
                        <View style={styles.chipsContainer}>
                            {messageCounts.map((count) => (
                                <TouchableOpacity
                                    key={count}
                                    style={[
                                        styles.chip,
                                        messageCount === count && styles.chipSelected
                                    ]}
                                    onPress={() => setMessageCount(count)}
                                >
                                    <Text
                                        style={[
                                            styles.chipText,
                                            messageCount === count && styles.chipTextSelected
                                        ]}
                                    >
                                        {count}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {behaviors.map((behavior, index) => (
                    <View key={index} style={styles.behaviorSection}>
                        <View style={styles.behaviorHeader}>
                            <Text style={styles.sectionTitle}>behavior: {behavior.name}</Text>
                        </View>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => router.push(behavior.routes.normal as any)}
                            >
                                <Text style={styles.buttonText}>Start with top</Text>
                                {behavior.name === "position" ? (
                                    <Ionicons name="warning" size={16} color="#FF9500" style={styles.icon} />
                                ) : (
                                    <Ionicons name="close" size={16} color="#FF3B30" style={styles.icon} />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => router.push(behavior.routes.reversed as any)}
                            >
                                <Text style={styles.buttonText}>Start with bottom</Text>
                                <Ionicons name="checkmark-circle" size={16} color="#34C759" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    fixedHeader: {
        width: "100%",
        backgroundColor: "#f5f5f5",
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0,
        paddingHorizontal: 18,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        zIndex: 1000,
    },
    scrollContainer: {
        padding: 14,
        paddingTop: 12,
        paddingBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 8,
        textAlign: "center",
    },
    techStackContainer: {
        backgroundColor: "#f8f8f8",
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e8e8e8",
        marginBottom: 12,
    },
    techStackTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
    },
    techStackContent: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#eeeeee",
    },
    techStackItem: {
        fontSize: 12,
        color: "#555",
        lineHeight: 18,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    messageCountContainer: {
        backgroundColor: "#f8f8f8",
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e8e8e8",
        marginBottom: 12,
    },
    messageCountHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#eeeeee",
    },
    messageCountTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },
    chipsContainer: {
        flexDirection: "row",
    },
    chip: {
        paddingVertical: 5,
        paddingHorizontal: 14,
        borderRadius: 16,
        backgroundColor: "#f0f0f0",
        marginLeft: 10,
        minWidth: 40,
        alignItems: "center",
    },
    chipSelected: {
        backgroundColor: "#007AFF",
    },
    chipText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#555",
    },
    chipTextSelected: {
        color: "#FFFFFF",
    },
    behaviorSection: {
        marginBottom: 12,
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 1,
        borderColor: "#ebebeb",
    },
    behaviorHeader: {
        padding: 10,
        backgroundColor: "#f2f2f2",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
        textAlign: "left",
        paddingLeft: 4,
    },
    buttonsContainer: {
        flexDirection: "row",
        padding: 10,
    },
    button: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 6,
        backgroundColor: "#fafafa",
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: "#eeeeee",
        height: 42,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#555",
        marginRight: 5,
    },
    icon: {
        marginLeft: 3,
    },
});
