import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HamburgerIcon = ({ open }: { open: boolean }) => {
  const icon = open ? faTimes : faBars;
  return <FontAwesomeIcon icon={icon} />;
};

export default HamburgerIcon;
