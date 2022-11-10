import * as Icons from "react-icons/fa";

const mapper: Record<string, JSX.Element> = {
  linkedin: <Icons.FaLinkedin />,
  github: <Icons.FaGithub />,
};

const DynamicFaIcon = (props: { name: string }) => {
  const IconComponent = mapper[props.name];

  if (!IconComponent) {
    return <Icons.FaBeer />;
  }

  return IconComponent;
};

export default DynamicFaIcon;
