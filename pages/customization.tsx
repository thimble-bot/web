import Meta from '@/components/Meta';

import MagicLink from '@/components/MagicLink';

const CustomizationPage = () => {
  return (
    <>
      <Meta
        title="Customization"
        description="Learn how you can customize your self-hosted instance of Thimble Bot."
        url="/customization"
      />

      <h1>Thimble Bot Customization</h1>

      <p>
        This page is a work in progress! Please check back later 💛 In the
        meantime, you could listen to some <MagicLink>music</MagicLink>.
      </p>
    </>
  );
};

export default CustomizationPage;
