import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/react";
import {getMemberPhotosByUserId} from "@/app/actions/memberActions";
import {Image} from "@heroui/image";
import StarButton from "@/components/StarButton";
import DeleteButton from "@/components/DeleteButton";
import React from "react";

export default async function PhotosPage({params}: { params: Promise<{ userId: string }>}) {

    const { userId } = await params;

    const photos = await getMemberPhotosByUserId(userId);

    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Photos
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="grid grid-cols-5 gap-3">
                    {photos && photos.map(photo => (
                        <div key={photo.id}>
                            <Image
                                width={300}
                                src={photo.url}
                                alt='Image of member'
                                className='object-cover aspect-square'
                            />
                            <div className='absolute top-3 left-3 z-50'>
                                <StarButton selected={false} loading={false}/>
                            </div>
                            <div className='absolute top-3 right-3 z-50'>
                                <DeleteButton loading={false}/>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </>

    )
}