import React, { createContext, useState, useContext } from 'react';

type MessageCountContextType = {
    messageCount: number;
    setMessageCount: React.Dispatch<React.SetStateAction<number>>;
};

const MessageCountContext = createContext<MessageCountContextType | undefined>(undefined);

export function MessageCountProvider({ children }: { children: React.ReactNode }) {
    const [messageCount, setMessageCount] = useState<number>(5); // Default to 30 messages

    return (
        <MessageCountContext.Provider value={{ messageCount, setMessageCount }}>
            {children}
        </MessageCountContext.Provider>
    );
}

export function useMessageCount() {
    const context = useContext(MessageCountContext);
    if (context === undefined) {
        throw new Error('useMessageCount must be used within a MessageCountProvider');
    }
    return context;
}
