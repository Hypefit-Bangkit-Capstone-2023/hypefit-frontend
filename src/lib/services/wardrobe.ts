import api from '$lib/api';
import type { ApiResponse, WardrobeItem } from './types';

const wardrobeService = {
	async getAllItem(): Promise<ApiResponse<WardrobeItem[]>> {
		const response = await api.get('/v1/wardrobe/items');
		const { success, data } = response.data;
		return {
			success,
			data: data.map((x: WardrobeItem) => ({
				...x,
				created_at: new Date(x.created_at)
			}))
		};
	}
};

export default wardrobeService;
