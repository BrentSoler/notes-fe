import { useSelector } from "react-redux";
import { useNotesQuery } from "../../hooks/api/notesQuery";
import { BsPencilFill } from "react-icons/bs";
import { useState } from "react";
import PostModal from "../PostModal";
import Backdrop from "../Backdrop";

const Dashboard = () => {
	const [isPosting, setIsPosting] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const { data } = useNotesQuery(user ? user.token : undefined);

	return (
		<>
			{isPosting && (
				<>
					<Backdrop setEditing={setIsPosting} state={false} />
					<PostModal setEditing={setIsPosting} />
				</>
			)}
			<div className="p-5 bg-slate-800 rounded-lg px-10 shadow-[0_5px_3px_0.2px_rgba(0,0,0,0.2)] lg:fixed top-[45vh] left-10 xl:left-[10rem] transition-all">
				<div className="flex flex-col items-center">
					<h1 className="text-xl font-semibold">{user ? user.name : ""}'s Notes</h1>
					<h1>No. of Post: {data ? data.count : ""}</h1>
					<button className="mt-8 btn rounded-full gap-4" onClick={() => setIsPosting(true)}>
						<BsPencilFill /> Post
					</button>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
