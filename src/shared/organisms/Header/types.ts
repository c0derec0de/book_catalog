import { type CommonSearchProps } from "../../../types/index";

type HeaderWithoutSearchProps = {
  showSearch?: false;
};
type HeaderWithSearchProps = CommonSearchProps & {
  showSearch: true;
};

export type HeaderProps = HeaderWithSearchProps | HeaderWithoutSearchProps;
