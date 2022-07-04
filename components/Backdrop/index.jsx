const Backdrop = ({ setEditing, state }) => {
	return (
		<div
			className="bg-gray-900 w-full h-screen absolute top-0 bg-opacity-60 right-0 z-[11]"
			onClick={() => setEditing(state)}
		></div>
	);
};

export default Backdrop;
