import api from '$lib/api';
import type {
	ApiResponse,
	CreateWardrobeItem,
	ItemCategory,
	ItemCategoryGroup,
	ItemCategoryGroupById,
	WardrobeItem
} from './types';

const wardrobeService = {
	async getAllItem(filter_category_id?: string): Promise<WardrobeItem[]> {
		const response = await api.get('/v1/wardrobe/items', {
			params: {
				category_id: filter_category_id
			}
		});
		return response.data.data.map((x: WardrobeItem) => ({
			...x,
			created_at: new Date(x.created_at)
		}));
	},

	async getItemById(id: string) {
		const response = await api.get(`/v1/wardrobe/items/${id}`);
		const { data } = response.data;
		data.created_at = new Date(data.created_at);
		return data;
	},

	async getItemCategoryGroups(): Promise<ItemCategoryGroup[]> {
		const response = await api.get('/v1/wardrobe/item_category_groups');
		return response.data.data;
	},

	async getItemCategoryGroupById(id: number): Promise<ItemCategoryGroupById> {
		const response = await api.get(`/v1/wardrobe/item_category_groups/${id}`);
		return response.data.data;
	},

	async getItemCategories(): Promise<ItemCategory[]> {
		const response = await api.get('/v1/wardrobe/item_categories');
		return response.data.data;
	},

	async createItem(req: CreateWardrobeItem): Promise<void> {
		await api.post('/v1/wardrobe/items', req);
	},

	async updateItem(id: string, req: CreateWardrobeItem): Promise<void> {
		await api.put(`/v1/wardrobe/items/${id}`, req);
	}
};

export default wardrobeService;
