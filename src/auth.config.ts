import {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials"; // "@auth/core/providers/credentials";
import {loginSchema} from "@/lib/schemas/loginSchema";
import {getUserByEmail} from "@/app/actions/authActions";
import {compare} from "bcryptjs";

export default {
    providers: [Credentials({
        name: "Credentials",
        async authorize(creds ) {
            const validated = loginSchema.safeParse(creds);
            console.log('VALIDATED:::: ', validated);
            if (validated.success) {
                const {email, password} = validated.data;
                const user = await getUserByEmail(email);

                if (!user || !(await compare(password, user.passwordHash))) return null;

                return user;
            }
            return null;
        }
    })],
} satisfies NextAuthConfig