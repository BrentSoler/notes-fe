import Image from "next/image";
import Icon from "../../public/Icon.webp";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";
import { useRouter } from "next/router";

const NavBar = ({ children }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { user } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(logout());
		router.push("/login");
	};

	return (
		<div className="drawer drawer-end">
			<input id="sidemenu" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content w-full">
				<div className="flex justify-between items-center relative">
					<a href="/">
						<div className="flex items-center mt-4 ml-4 space-x-2">
							<Image src={Icon} width={65} height={65} />
							<h1 className="text-4xl font-bold">Notes.</h1>
						</div>
					</a>
					<label className="drawer-button absolute right-4 top-8 sm:hidden" htmlFor="sidemenu">
						<AiOutlineMenuUnfold className="text-4xl" />
					</label>
					<ul className="mt-4 mr-4 space-x-3 hidden sm:block">
						{!user && <a href="/login">Login</a>}
						{!user && <a href="/register">Register</a>}
						{user && <button onClick={logoutHandler}>Logout</button>}
					</ul>
				</div>
				<div className="divider"></div>
				{children}
			</div>
			<div className="drawer-side">
				<label htmlFor="sidemenu" className="drawer-overlay"></label>
				<ul className="menu bg-base-100 overflow-y-auto w-[50%] p-5 font-semibold text-xl space-y-5 flex flex-col justify-center z-[999]">
					{!user && <a href="/login">Login</a>}
					{!user && <a href="/register">Register</a>}
					{user && <label onClick={logoutHandler}>Logout</label>}
				</ul>
			</div>
		</div>
	);
};

export default NavBar;
