import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNotesQuery } from "../hooks/api/notesQuery";
import Card from "../components/Card";

export default function Home() {
	const { user } = useSelector((state) => state.auth);
	const { data, isLoading, isError, isSuccess, refetch } = useNotesQuery(
		user ? user.token : undefined
	);
	const router = useRouter();

	useEffect(() => {
		if (isError) {
			setTimeout(() => {
				router.push("/404");
			}, 2000);
		}
	}, [isError]);

	useEffect(() => {
		if (!user) {
			router.push("/login");
		}

		refetch();
	}, [data]);

	return (
		<div className="flex justify-center flex-col items-center gap-4 pb-5 w-full" id="dashboard">
			<Head>
				{user && <title>{user ? user.name : ""}&apos;s Dashboard</title>}
				{!user && <title>Notes App</title>}
			</Head>
			{isLoading && <div className="lds-dual-ring"></div>}
			{isSuccess ? (
				data.count === 0 ? (
					<div>No Posts</div>
				) : (
					data.posts.map((post) => (
						<Card title={post.title} body={post.body} id={post._id} key={post._id} />
					))
				)
			) : null}
		</div>
	);
}
