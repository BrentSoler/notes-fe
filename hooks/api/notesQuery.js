import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import api from "./api";

const URL = "/notes";

const fetchNotes = async (userToken) => {
	const res = await api.get(URL, {
		headers: {
			Authorization: `Bearer ${userToken}`,
		},
	});

	return res.data.data;
};

export function useNotesQuery(userToken) {
	return useQuery(["notes", userToken], () => fetchNotes(userToken), {
		onError: (error) => toast.error(error.message),
		refetchOnWindowFocus: false,
	});
}

const updateNote = async ({ id, userData, userToken }) => {
	const res = await api.put(`${URL}`, userData, {
		headers: {
			Authorization: `Bearer ${userToken}`,
		},
		params: {
			id: id,
		},
	});
};

export function updateNotesQuery() {
	return useMutation(updateNote, {
		onError: (error) => toast.error(error.response.data) || toast.error(error.message),
	});
}

const deleteNotes = async ({ id, userToken }) => {
	const res = await api.delete(URL, {
		headers: { Authorization: `Bearer ${userToken}` },
		params: {
			id: id,
		},
	});
};

export function deleteNotesQuery() {
	return useMutation(deleteNotes, {
		onError: (error) => toast.error(error.response.data) || toast.error(error.message),
	});
}

const postNote = async ({ data, userToken }) => {
	const res = await api.post(URL, data, { headers: { Authorization: `Bearer ${userToken}` } });
};

export function usePostQuery() {
	return useMutation(postNote, {
		onError: (error) => toast.error(error.response.data) || toast.error(error.message),
	});
}
