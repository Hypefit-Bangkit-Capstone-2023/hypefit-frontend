import api from '$lib/api';
import type {
	ApiResponse,
	CreateWardrobeItem,
	ItemCategoryGroup,
	ItemCategoryGroupById,
	WardrobeItem
} from './types';

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
	},

	async getItemCategoryGroups(): Promise<ItemCategoryGroup[]> {
		const response = await api.get('/v1/wardrobe/item_category_groups');
		return response.data.data;
	},

	async getItemCategoryGroupById(id: number): Promise<ItemCategoryGroupById> {
		const response = await api.get(`/v1/wardrobe/item_category_groups/${id}`);
		return response.data.data;
	},

	async createItem(req: CreateWardrobeItem): Promise<void> {
		await api.post('/v1/wardrobe/items', req);
	}
};

export default wardrobeService;
