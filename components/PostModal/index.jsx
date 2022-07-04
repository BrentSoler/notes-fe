import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNotesQuery, usePostQuery } from "../../hooks/api/notesQuery";

const PostModal = ({ setEditing }) => {
	const [formData, setFormData] = useState({
		title: "",
		body: "",
	});
	const { user } = useSelector((state) => state.auth);
	const { refetch } = useNotesQuery(user.token);
	const { isSuccess, mutate, isError } = usePostQuery();

	const { title, body } = formData;

	const change = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (isError) {
			toast.error("Someting went wrong!");
		}

		if (isSuccess) {
			toast.success("Successfully posted!");
			refetch();
			setEditing(false);
		}
	}, [isSuccess, isError]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (!title || !body) {
			toast.error("Missing Fields!");
			return;
		}

		mutate({ data: formData, userToken: user.token });
	};

	return (
		<div className="group card p-4 bg-slate-800 gap-3 w-[90%] h-[50%] sm:w-[30rem] sm:h-[20rem] overflow-visible py-8 absolute z-[12] top-[10rem] right-6 md:right-[20vw] lg:right-[25vw] xl:right-[35vw] ">
			<h1 className="text-3xl font-bold">Post</h1>
			<form className="flex flex-col gap-4 w-full h-full justify-center" onSubmit={submitHandler}>
				<input
					type="text"
					className="input"
					placeholder="Enter a title"
					name="title"
					value={title}
					onChange={change}
				/>
				<input
					type="text"
					className="input"
					placeholder="Enter a body"
					name="body"
					value={body}
					onChange={change}
				/>

				<div className="card-actions place-self-end">
					<button className="btn">Done</button>
				</div>
			</form>
			<div
				className={`card-actions absolute -top-5 -right-6 transition-all z-[9] flex flex-col p-1`}
			>
				<button className="btn rounded-full gap-x-3" onClick={() => setEditing(false)}>
					<AiOutlineClose />
				</button>
			</div>
		</div>
	);
};

export default PostModal;
