import {usePathname, useRouter} from "next/navigation";
import React, {useEffect} from "react";
import {FaFemale, FaMale} from "react-icons/fa";
import useFilterStore from "@/hooks/useFilterStore";
import {Selection} from "@heroui/react";

export const useFilters = () => {

    const pathname = usePathname();
    const router = useRouter();
    const [clientLoaded, setClientLoaded] = React.useState(false);

    useEffect(() => setClientLoaded(true), []);

    const {filters, setFilters} = useFilterStore();

    const {gender, ageRange, orderBy} = filters;

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (gender) searchParams.set('gender', gender.join(','));
        if (ageRange) searchParams.set('ageRange', ageRange.join(','));
        if (orderBy) searchParams.set('orderBy', orderBy);

        router.replace(`${pathname}?${searchParams}`);

    }, [ageRange, orderBy, gender, router, pathname])

    const orderByList = [
        {label: 'Last active', value: 'updated'},
        {label: 'Newest members', value: 'created'},
    ]

    const genderList = [
        {value: 'male', icon: FaMale},
        {value: 'female', icon: FaFemale},
    ]

    const handleAgeSelect = (value: number[]) => {
        setFilters('ageRange', value);
    }

    const handleOrderSelect = (value: Selection) => {
        if (value instanceof Set) {
            setFilters('orderBy', value.values().next().value);
        }
    }

    const handleGenderSelect = (value: string) => {
        if (gender.includes(value)) setFilters('gender', gender.filter(g => g !== value));
        else setFilters('gender', [...gender, value]);
     }

     return {
         orderByList,
         genderList,
         selectAge: handleAgeSelect,
         selectGender: handleGenderSelect,
         selectOrder: handleOrderSelect,
         filters,
         clientLoaded
     }
}