'use client';

import {Session} from "next-auth";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@heroui/react";
import React from "react";
import Link from "next/link";
import {signOutUser} from "@/app/actions/authActions";

type Props ={
    user: Session['user']
}
export default function UserMenu({user}: Props) {
    return (
        <Dropdown placement='bottom-end'>
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='secondary'
                    name={user?.name || 'user avatar'}
                    size='sm'
                    src={user?.image || '/images/user.png'}

                />
            </DropdownTrigger>
            <DropdownMenu
                variant='faded'
                aria-label='User actions menu'
            >
                <DropdownSection >
                    <DropdownItem
                        key='user-name'
                        as='span'
                        className='h-14 flex flex-row'
                        aria-label='username'
                    >
                        Signed in as {user?.name}
                    </DropdownItem>
                    <DropdownItem showDivider
                        key='edit-profile'
                        as={Link}
                        href='/members/edit'
                    >
                        Edit Profile
                    </DropdownItem>
                    <DropdownItem
                        key='logout'
                        color='danger'
                        onPress={async () => await signOutUser()}
                    >
                        Log out
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}