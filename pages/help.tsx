import Meta from '@/components/Meta';
import HelpContent from '@/content/HelpContent.mdx';
import { fetchDiscordUser, PrivilegedUserData } from '@/lib/discord';

const HelpPage = ({ user }: { user: PrivilegedUserData }) => (
  <>
    <Meta
      title="Help and Support"
      description="Get in touch with the maintainers of Thimble Bot."
      url="/help"
    />

    <HelpContent user={user} />
  </>
);

export async function getServerSideProps(ctx) {
  try {
    const user = await fetchDiscordUser('owner');
    return {
      props: {
        user
      }
    };
  } catch (err) {
    return {
      props: {
        user: {
          id: process.env.MAINTAINER_ID,
          username: '(click)'
        }
      }
    };
  }
};

export default HelpPage;
