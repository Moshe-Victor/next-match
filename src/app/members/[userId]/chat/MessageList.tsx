'use client';
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {MessageDto} from "@/types";
import MessageBox from "@/app/members/[userId]/chat/MessageBox";
import {pusherClient} from "@/lib/pusher";
import {formatShortDateTime} from "@/lib/util";
import {Channel} from "pusher-js";

type Props = {
    initialMessages: MessageDto[];
    currentUserId: string;
    chatId: string;
}

export default function MessageList({initialMessages, currentUserId, chatId}: Props) {
    const setReadCount = useRef(false);
    const channelRef = useRef<Channel | null>(null);
    const  [messages, setMessages] = useState(initialMessages);

    useEffect(() => {
        if (!setReadCount.current) {

            setReadCount.current = true;
        }
    }, []);


    const handleNewMessage = useCallback((newMessage: MessageDto) => {
        setMessages(prevState => [...prevState, newMessage]);
    }, [])

    const handleReadMessages  = useCallback((messageIds: string[]) => {
        setMessages(prevState => prevState.map(message => messageIds.includes(message.id)
        ? {...message, dateRead: formatShortDateTime(new Date())}
            : message
        ))
    }, []);

    useEffect(() => {
        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe(chatId);

            channelRef.current?.bind('message:new', handleNewMessage);
            channelRef.current?.bind('message:read', handleReadMessages);
        }
        return () => {
            if (channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind('message:new', handleNewMessage);
                channelRef.current.unbind('message:read', handleReadMessages);
            }
        }
    }, [chatId, handleNewMessage, handleReadMessages]);

    return (
        <div>
            {initialMessages.length === 0 ? 'No messages to display' : (
                <div>
                    {messages.map((message) => (
                        <MessageBox
                            key={message.id}
                            message={message}
                            currentUserId={currentUserId}/>
                    ))}
                </div>
            )}
        </div>
    );
}