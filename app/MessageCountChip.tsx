import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MessageCountChipProps {
    counts: number[];
    selectedCount: number;
    onSelectCount: (count: number) => void;
}

export const MessageCountChip: React.FC<MessageCountChipProps> = ({
                                                                      counts,
                                                                      selectedCount,
                                                                      onSelectCount,
                                                                  }) => {
    return (
        <View style={styles.container}>
            {counts.map((count) => (
                <TouchableOpacity
                    key={count}
                    style={[
                        styles.chip,
                        selectedCount === count && styles.selectedChip,
                    ]}
                    onPress={() => onSelectCount(count)}
                >
                    <Text
                        style={[
                            styles.chipText,
                            selectedCount === count && styles.selectedChipText,
                        ]}
                    >
                        {count}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 8,
        marginBottom: 4,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginHorizontal: 4,
        backgroundColor: "#e0e0e0",
    },
    selectedChip: {
        backgroundColor: "#007AFF",
    },
    chipText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    selectedChipText: {
        color: "#FFFFFF",
    },
});
