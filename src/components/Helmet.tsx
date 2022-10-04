import { Helmet as ReactHelmet } from "react-helmet-async";

type HelmetProps = {
  title: string;
  description: string;
};

const Helmet = ({ title, description }: HelmetProps) => {
  return (
    <ReactHelmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </ReactHelmet>
  );
};

export default Helmet;
