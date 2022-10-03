import queryString from "query-string";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

export const useRouter = () => {
  const location = useLocation();
  const history = useHistory();

  const query = queryString.parse(location.search);
  const { push } = history;

  return { query, push };
};
