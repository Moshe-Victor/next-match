import React from "react";
import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/react";
import {getAuthUserId} from "@/app/actions/authActions";
import {getMemberByUserId, getMemberPhotosByUserId} from "@/app/actions/memberActions";
import {Image} from "@heroui/image";
import StarButton from "@/components/StarButton";
import DeleteButton from "@/components/DeleteButton";
import ImageUploadButton from "@/components/ImageUploadButton";
import MemberPhotoUpload from "@/app/members/edit/photos/MemberPhotoUpload";
import MemberImage from "@/components/MemberImage";
import MemberPhotos from "@/components/MemberPhotos";

export default async function PhotosPage() {

    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const photos = await getMemberPhotosByUserId(userId);

    return (
        <>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div className='text-2xl font-semibold text-secondary'>
                    Edit Profile
                </div>

                <MemberPhotoUpload/>
            </CardHeader>
            <Divider/>
            <CardBody>

                <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image} />
            </CardBody>
        </>
    );
}