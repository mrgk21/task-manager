import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "../feaures/store";

interface Props {
	children: ReactNode;
}
const Init = ({ children }: Props) => {
	return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Init;
