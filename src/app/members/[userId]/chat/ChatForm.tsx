'use client';

import {messageSchema, MessageSchema} from "@/lib/schemas/messageSchema";
import React from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {HiPaperAirplane} from "react-icons/hi";
import {useParams, useRouter} from "next/navigation";
import {createMessage} from "@/app/actions/messageActions";
import {handleFormServerErrors} from "@/lib/util";

export default function ChatForm() {
    const router = useRouter();

    const params = useParams<{userId: string}>();

    const {register, handleSubmit, reset, setError, formState: {isSubmitting, isValid, errors}} = useForm<MessageSchema>({
        resolver: zodResolver(messageSchema),
    })

    const onSubmit = async (data: MessageSchema) => {

        const result = await createMessage(params.userId, data);

        if (result.status === 'error') {
            handleFormServerErrors(result, setError)
        }else{
            reset();
            router.refresh();
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <div className='flex flex items-center gap-2'>
                <Input
                    fullWidth
                    placeholder='Type a message'
                    variant='faded'
                    {...register('text')}
                    isInvalid={!!errors.text}
                    errorMessage={errors.text?.message}
                />
                <Button
                    type='submit'
                    isIconOnly
                    color='secondary'
                    radius='full'
                    isLoading={isSubmitting}
                    isDisabled={!isValid || isSubmitting}
                >
                    <HiPaperAirplane size={18}/>
                </Button>
            </div>
            <div className='flex flex-col'>
                {errors.root?.serverError && (
                    <p className='text-red-500'>{errors.root.serverError.message}</p>
                )}
            </div>


        </form>
    )
}