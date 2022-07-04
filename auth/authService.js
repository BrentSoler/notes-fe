import api from "../hooks/api/api";

const URL = "/user";

const register = async (userData) => {
	const res = await api.post(`${URL}/register`, userData);

	if (res.data) {
		localStorage.setItem("user", JSON.stringify(res.data.data));
	}

	return res.data.data;
};

const login = async (userData) => {
	const res = await api.post(`${URL}/login`, userData);

	if (res.data) {
		localStorage.setItem("user", JSON.stringify(res.data.data));
	}

	return res.data.data;
};

const getLocal = async () => {
	return JSON.parse(localStorage.getItem("user"));
};

const logout = async () => {
	localStorage.removeItem("user");
};

const authService = {
	register,
	logout,
	login,
	getLocal,
};

export default authService;
