import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../auth/authSlice";
import { useRouter } from "next/router";

const Login = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [userData, setUserData] = useState({
		name: "",
		password: "",
	});

	const { name, password } = userData;
	const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

	const change = (e) => {
		setUserData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
	};

	useEffect(() => {
		if (isError) {
			toast.error(message, { toastId: "loginToast" });
		}

		if (isSuccess || user) {
			router.push("/");
		}

		if (isSuccess) {
			toast.success("Successfully Loggedin!");
		}

		dispatch(reset());
	}, [user, isLoading, isSuccess, isError, message, dispatch]);

	if (user) {
		router.replace("/");
	}

	const submitHandler = (e) => {
		e.preventDefault();

		if (!name || !password) {
			toast.error("Missing Fields");
			return;
		}

		dispatch(login({ name: name, password: password }));
	};

	return (
		<div className="flex justify-center p-5 items-center" id="login">
			<div className="bg-base-content p-5 card w-[90%] sm:w-[40%] items-center flex flex-col h-[20rem] justify-center">
				<h1 className="card-title text-5xl text-base-100">Login.</h1>
				<form
					onSubmit={submitHandler}
					className="mt-3 w-full gap-4 flex flex-col h-full justify-center"
				>
					<input
						type="text"
						className="input w-full"
						placeholder="Enter name"
						name="name"
						value={userData.name}
						onChange={change}
					/>
					<input
						type="password"
						className="input w-full"
						placeholder="Enter password"
						name="password"
						value={userData.password}
						onChange={change}
					/>
					<button type="submit" className="btn self-center mt-4 gap-3">
						<AiOutlineSend />
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
