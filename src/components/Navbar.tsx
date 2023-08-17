import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { DAINavbar, DAIAvatar } from './DaisyUIClient';

export const Navbar = async (props: any) => {
  const session = await getSession();

  const user = session?.user;
  return (
    <DAINavbar className="flex justify-end gap-4 bg-secondary/70 border-b-2 border-secondary/30">
      {user ? (
        <>
          <DAIAvatar
            src={user.picture}
            size="xs"
            shape="circle"
            border={true}
            borderColor="primary"
          />
          <Link href="/api/auth/logout" className="btn btn-primary">
            Logout
          </Link>
        </>
      ) : (
        <a href="/api/auth/login" className="btn btn-primary">
          Login
        </a>
      )}
    </DAINavbar>
  );
};
