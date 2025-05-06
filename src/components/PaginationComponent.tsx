'use client'

import React from "react";
import clsx from "clsx";
import {Pagination} from "@heroui/react";

export default function PaginationComponent() {

    const [active, setActive] = React.useState(3);

    return (

        <div className='border-t-2 w-full mt-5'>
            <div className='flex flex-row items-center justify-between py-5'>
                <div>Showing 1-10 of 23 results</div>
                <Pagination
                    total={20}
                    color='secondary'
                    initialPage={1}
                    variant='bordered'
                />
                <div className='flex flex-row items-center gap-1'>
                    Page size:
                    {[3,6,12].map((size) => (
                        <div key={size} className={clsx('page-size-box', {
                        'bg-secondary text-white hover:bg-secondary hover:text-white': active === size}
                        )}>
                            {size}
                        </div>
                    ))}
                </div>
            </div>

        </div>

    )
}
