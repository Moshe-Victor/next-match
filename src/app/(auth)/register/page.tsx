import RegisterForm from "@/app/(auth)/register/RegisterForm";
import {JSX} from "react";

/**
 * Represents the RegisterPage component.
 * This component renders a registration page layout by centering the RegisterForm
 * component both vertically and horizontally.
 *
 * @return {JSX.Element} A JSX element representing the Register page with a centered form.
 */
export default function RegisterPage(): JSX.Element {
    return (
        <div className='flex justify-center items-center vertical-center'>
            <RegisterForm/>
        </div>
    );
}

