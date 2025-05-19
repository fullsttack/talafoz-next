import NextAuth from 'next-auth';
import { authOptions } from './options';

// Handler برای API route
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 