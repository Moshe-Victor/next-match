'use client';

import {Member} from "@prisma/client";
import {Card, CardBody, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
import {calculateAge, transformImageUrl} from "@/lib/util";
import {Divider} from "@heroui/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Button} from "@heroui/button";

type Props = {
    member: Member
    navLinks: {name: string; href: string}[]
}

export default function MemberSidebar({member, navLinks}: Props) {
    const pathName = usePathname();

    return (
        <Card className="w-full mt-10 items-center h-[80vh]">
            <Image
                height={200}
                width={200}
                src={transformImageUrl(member.image) || '/images/user.png'}
                alt='User profile main image'
                className="rounded-full mt-6 aspect-square object-cover"
            />
            <CardBody>
                <div className="flex flex-col items-center">
                    <div className="text-2xl">
                        {member.name}, {calculateAge(member.dateOfBirth)}
                    </div>
                    <div className="text-sm text-neutral-500">
                        {member.city}, {member.country}
                    </div>
                </div>
                <Divider className='mt-3'/>
                <nav className='flex flex-col p-4 ml-4 text-2xl gap-4'>
                    {navLinks.map((link) => (
                        <Link
                            href={link.href}
                            key={link.name}
                            className={`block rounded ${pathName === link.href ? 'text-secondary' : 'hover:text-secondary/50'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </CardBody>
            <CardFooter>
                <Button
                    as={Link}
                    href='/members'
                    fullWidth
                    color='secondary'
                    variant='bordered'
                    >
                    Go back
                </Button>

            </CardFooter>
        </Card>
    )
}