import Layout from "../components/Layout";
import "../styles/globals.css";
import { Provider } from "react-redux";
import authStore from "../app/authStore";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useRef } from "react";

function MyApp({ Component, pageProps }) {
	const client = useRef(new QueryClient());

	return (
		<Provider store={authStore}>
			<QueryClientProvider client={client.current}>
				<Hydrate state={pageProps.dehydratedState}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Hydrate>
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;
