import Meta from "@/components/Meta";

import PrivacyPolicy from '@/content/PrivacyPolicy.mdx';

const PrivacyPage = () => (
  <>
    <Meta
      title="Privacy Policy"
      description="Learn how Thimble Bot uses your data."
      url="/privacy"
    />

    <PrivacyPolicy />
  </>
);

export default PrivacyPage;
