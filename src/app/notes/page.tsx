import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Note() {
  return <main>Create or choose a Note from the sidebar</main>;
});
