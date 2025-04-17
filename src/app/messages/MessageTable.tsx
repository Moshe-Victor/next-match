'use client';
import {Table, TableColumn} from "@heroui/table";
import {TableBody, TableHeader} from "@react-stately/table";
import {getKeyValue, TableCell, TableRow} from "@heroui/react";
import {useRouter, useSearchParams} from "next/navigation";
import {MessageDto} from "@/types";
import {Key} from "react";
import {Card} from "@heroui/card";

type Props = {
    messages: MessageDto[];
}

export default function MessageTable({messages}: Props) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const isOutbox = searchParams.get('container') === 'outbox';
    const columns = [
        {key: isOutbox ? 'recipientName' : 'senderName', label: isOutbox ? 'Recipient' : 'Sender'},
        {key: 'text', label: 'Message'},
        {key: 'created', label: isOutbox ? 'Date sent' : 'Date received'},
    ]

    const handleRowSelect = (key: Key) => {
        const message = messages.find(m => m.id === key);
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`;
        router.push(url + '/chat');
    }

    return (
        <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
            <Table aria-label="Message Table"
                   selectionMode="single"
                   onRowAction={(key) => handleRowSelect(key)}
            >
                <TableHeader>
                    {columns.map((column) =>
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody>
                    {messages.map((message) =>
                        <TableRow key={message.id} className="cursor-pointer">
                            {(columnKey) => (
                                <TableCell>
                                    <div className={`${!message.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                                        {getKeyValue(message, columnKey)}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    )
}