import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "../feaures/store";

interface Props {
	children: ReactNode;
}
const Init = ({ children }: Props) => {
	return (
		<ReduxProvider store={store}>
			<PersistGate persistor={persistStore(store)}>{children}</PersistGate>
		</ReduxProvider>
	);
};

export default Init;
