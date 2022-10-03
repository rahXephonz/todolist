import { Detail, List } from "pages/index";

const ROUTES = {
  PUBLIC: [
    { PATH: "/list", NAME: `List`, COMPONENT: List },
    { PATH: "/detail", NAME: `Detail`, COMPONENT: Detail },
  ],
};

export default ROUTES;
