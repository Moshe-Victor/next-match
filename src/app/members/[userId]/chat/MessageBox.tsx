import {MessageDto} from "@/types";
import React from 'react';
import clsx from "clsx";
import {transformImageUrl} from "@/lib/util";
import {Avatar} from "@heroui/react";

type Props = {
    message: MessageDto;
    currentUserId: string;
}

export default function MessageBox({message, currentUserId}: Props) {
    const isCurrentUserSender = message.senderId === currentUserId;

    const renderAvatar = () => (
         <Avatar name={message.senderName}
                className='self-end'
                src={transformImageUrl(message.senderImage) || 'images/user.png'}
        />
)

    return(
        <div className={clsx('flex gap-2 mb-3', {
            'justify-end text-right': isCurrentUserSender,
            'justify-start text-right': !isCurrentUserSender,
        })}>

            {!isCurrentUserSender && renderAvatar()}
            <div>Message Content</div>
            {isCurrentUserSender && renderAvatar()}
        </div>
    )
};

