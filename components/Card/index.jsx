import { useEffect, useState } from "react";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Backdrop from "../Backdrop";
import { toast } from "react-toastify";
import { deleteNotesQuery, updateNotesQuery, useNotesQuery } from "../../hooks/api/notesQuery";
import { useSelector } from "react-redux";

const Card = ({ title, body, id }) => {
	const postId = id;
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const [formData, setFormData] = useState({
		newTitle: title,
		newBody: body,
	});
	const { isSuccess: updSuccess, mutate, isError: updErr } = updateNotesQuery();
	const { isSuccess: delSuccess, mutate: deleteMutate } = deleteNotesQuery();
	const { refetch } = useNotesQuery(user.token);

	const { newBody, newTitle } = formData;

	const change = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (updErr) {
			toast.error("error");
		}

		if (updSuccess) {
			toast.success("Succefully updated!", { toastId: "updateID" });
			refetch();
		}
	}, [updErr, updSuccess]);

	useEffect(() => {
		if (delSuccess) {
			toast.success("Succefully deleted!", { toastId: "deleteID" });
			refetch();
		}
	}, [delSuccess]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (!newTitle || !newBody) {
			toast.error("Missing fields");
			return;
		}

		mutate({ id: id, userData: { title: newTitle, body: newBody }, userToken: user.token });
		console.log(id);
		setEditing(false);
	};

	const handleDelete = () => {
		deleteMutate({ id: id, userToken: user.token });

		console.log(postId);
	};

	return (
		<>
			{editing && (
				<>
					<Backdrop setEditing={setEditing} state={false} />
					<div className="group card p-4 bg-slate-800 gap-3 w-[90%] h-[50%] sm:w-[30rem] sm:h-[20rem] overflow-visible py-8 absolute z-[12] top-[10rem]">
						<form
							className="flex flex-col gap-4 w-full h-full justify-center"
							onSubmit={submitHandler}
						>
							<input
								type="text"
								className="input"
								placeholder="Enter new title"
								name="newTitle"
								value={newTitle}
								onChange={change}
							/>
							<input
								type="text"
								className="input"
								placeholder="Enter new body"
								name="newBody"
								value={newBody}
								onChange={change}
							/>

							<div className="card-actions place-self-end">
								<button className="btn">Done</button>
							</div>
						</form>
						<div
							className={`card-actions absolute -top-5 -right-6 transition-all z-[9] flex flex-col p-1`}
						>
							<button
								className="btn rounded-full gap-x-3"
								onClick={() => {
									setEditing(!editing);
								}}
							>
								<AiOutlineClose />
							</button>
						</div>
					</div>
				</>
			)}

			{deleting && (
				<>
					<Backdrop setEditing={setDeleting} state={false} />
					<div className="group card p-8 bg-slate-800 gap-3 w-[90%] h-[50%] sm:w-[30rem] sm:h-[20rem] overflow-visible py-10 absolute z-[12] top-[30vh]">
						<form
							className="flex flex-col gap-4 w-full h-full justify-center"
							onSubmit={submitHandler}
						>
							<h1 className="font-bold text-2xl">Delete?</h1>
							<h3 className="font-semibold text-lg">Are you sure you want to delete this post?</h3>
							<p className="py-4">
								If you delete this you will no longer have a chance to get it back
							</p>
							<div className="card-actions place-self-end ">
								<button className="btn btn-error" onClick={handleDelete}>
									Delete
								</button>
							</div>
						</form>
						<div
							className={`card-actions absolute -top-5 -right-6 transition-all z-[9] flex flex-col p-1`}
						>
							<button
								className="btn rounded-full gap-x-3"
								onClick={() => {
									setDeleting(false);
								}}
							>
								<AiOutlineClose />
							</button>
						</div>
					</div>
				</>
			)}

			<div className="w-full flex justify-center">
				<div className="group card p-4 bg-slate-800 space-y-3  min-w-[95%] max-w-[95%] sm:min-w-[30rem] sm:max-w-[30rem] relative overflow-visible z-10 py-8 h-fit">
					<p className="text-3xl font-bold break-words">{title}</p>
					<p className="break-words">{body}</p>

					<div
						className={`lg:opacity-0 card-actions place-self-end lg:absolute top-0 right-0 lg:-right-6 lg:group-hover:opacity-100 transition-all lg:group-hover:translate-x-8 z-[9] flex lg:flex-col p-1`}
					>
						<button className="btn rounded-full h-full" onClick={() => setEditing(!editing)}>
							<BsPencilFill />
						</button>
						<label className="modal-button btn rounded-full" onClick={() => setDeleting(true)}>
							<BsFillTrashFill />
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
