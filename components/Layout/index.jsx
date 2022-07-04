import HeadComp from "../HeadComp/HeadComp";
import { Theme } from "react-daisyui";
import { useState } from "react";
import NavBar from "../Nav";
import { useEffect } from "react";
import { getLocal } from "../../auth/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../Dashboard";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
	const [Mode, setMode] = useState("dark"); // light or dark
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		dispatch(getLocal());
	}, []);

	return (
		<Theme dataTheme={Mode}>
			<HeadComp />
			<div className="font-pop">
				<NavBar>
					{router.pathname === "/" && (
						<div className="lg:flex justify-center lg:space-x-11 space-y-5 items-center w-full">
							<Dashboard />
							{children}
						</div>
					)}
					{router.pathname !== "/" && <div>{children}</div>}
				</NavBar>
				<ToastContainer
					position="bottom-right"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme={Mode}
				/>
			</div>
		</Theme>
	);
};

export default Layout;
