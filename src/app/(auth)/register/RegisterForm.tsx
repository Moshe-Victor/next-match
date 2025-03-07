'use client';

import React, {JSX} from 'react';
import {useForm} from "react-hook-form";
import {Card, CardBody, CardHeader} from "@heroui/card";
import {GiPadlock} from "react-icons/gi";
import {Input} from "@heroui/input";
import {Button} from "@heroui/react";
import {RegisterSchema} from "@/lib/schemas/registerSchema";
import {registerUser} from "@/app/actions/authActions";

/**
 * Represents a component for rendering a registration form.
 * This form utilizes react-hook-form for form validation and data handling.
 *
 * @return {JSX.Element} The RegisterForm component containing the registration UI.
 */
function RegisterForm(): JSX.Element {
    const {register, handleSubmit, setError, formState: { errors, isValid, isSubmitting}} = useForm<RegisterSchema>(
        {
            // resolver: zodResolver(registerSchema),
            mode: 'onTouched'
        }
    );

    const onSubmit = async (data: RegisterSchema) => {
        const results = await registerUser(data)

        if (results.status === 'success') {
            console.log('user registered successfully');
        } else {
            if (Array.isArray(results.error)) {
                results.error.forEach((e) => {
                    const fieldName = e.path.join('.') as 'email' | 'password' | 'name';
                    setError(fieldName, {
                        message: e.message,
                    });
                });
            } else {
                setError('root.serverError', {message: results.error})
            }
        }
    }

    return (
        <Card className='w-2/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-secondary'>

                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} />
                        <h1 className='text-3xl font-semibold'>Register</h1>
                    </div>
                    <p className="text-neutral-500">Welcome back to NextMatch</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div className="space-y-4">
                        <Input
                            defaultValue=''
                            label='Name'
                            variant='bordered'
                            {...register('name')}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                        />
                        <Input
                            defaultValue=''
                            label='Email'
                            variant='bordered'
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message as string}
                        />
                        <Input
                            defaultValue=''
                            label='Password'
                            variant='bordered'
                            type='password'
                            {...register('password')}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                        />

                        {errors.root?.serverError && (
                            <p className='text-red-500'>{errors.root.serverError.message}</p>
                        )}

                        <Button
                            isLoading={isSubmitting}
                            isDisabled={!isValid} fullWidth color='secondary' type='submit'>
                            Register
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}

export default RegisterForm;