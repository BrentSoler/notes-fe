import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../auth/authSlice";

const Register = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const [userData, setUserData] = useState({
		name: "",
		password: "",
		confrimPassword: "",
	});

	const { name, password, confrimPassword } = userData;
	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			toast.error(message, { toastId: "registerToast" });
		}

		if (isSuccess || user) {
			router.push("/");
		}

		if (isSuccess) {
			toast.success("Successfully made an account!", { toastId: "registerToast" });
		}

		dispatch(reset());
	}, [user, isLoading, isError, isSuccess, message, dispatch, router]);

	const change = (e) => {
		setUserData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (name === "" || password === "" || confrimPassword === "") {
			toast.error("Missing Fields");
			return;
		}
		if (password !== confrimPassword) {
			toast.error("Password is not the same");
			return;
		}

		dispatch(register({ name: name, password: password }));
	};

	return (
		<div className="flex justify-center p-5 items-center" id="register">
			{!isLoading && (
				<div className="bg-base-content p-5 card w-[90%] sm:w-[50%] items-center flex flex-col h-[28rem] justify-center">
					<h1 className="card-title text-5xl text-base-100">Register.</h1>
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
						<input
							type="password"
							className="input w-full"
							placeholder="Confirm password"
							name="confrimPassword"
							value={userData.confrimPassword}
							onChange={change}
						/>
						<button type="submit" className="btn self-center mt-4 gap-3">
							<AiOutlineSend />
							Submit
						</button>
					</form>
				</div>
			)}
			{isLoading && <progress className="progress progress-primary w-80"></progress>}
		</div>
	);
};

export default Register;
