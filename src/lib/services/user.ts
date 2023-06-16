import api from '$lib/api';
import type { UserProfile } from './types';

const userService = {
	async getProfile() {
		const response = await api.get('/v1/users/me');
		return response.data.data as UserProfile;
	}
};

export default userService;
