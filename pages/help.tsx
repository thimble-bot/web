import Meta from '@/components/Meta';
import HelpContent from '@/content/HelpContent.mdx';

const HelpPage = () => (
  <>
    <Meta
      title="Help and Support"
      description="Get in touch with the maintainers of Thimble Bot."
      url="/help"
    />

    <HelpContent />
  </>
);

export default HelpPage;
