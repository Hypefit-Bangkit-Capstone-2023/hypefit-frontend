export type ApiResponse<T> = {
	success: boolean;
	data: T;
};

export type ApiResponseNoData = {
	success: boolean;
};

export type RecommendationItem = {
	id: number;
	image_urls: string[];
	is_liked: boolean;
};

export type Recommendation = {
	wardrobe_item_count: {
		top: number;
		bottom: number;
		shoe: number;
	};
	pending_task_count: number;
	started_task_count: number;
	completed_task_count: number;
	failed_task_count: number;
	items: RecommendationItem[];
};

export type WardrobeItem = {
	id: number;
	name: string;
	category_group_id: number;
	category_group_name: string;
	category_id: number;
	category_name: string;
	created_at: Date;
	image_url: string;
};

export type ItemCategoryGroup = {
	id: number;
	name: string;
};

export type ItemCategory = {
	id: number;
	name: string;
};

export type ItemCategoryGroupById = {
	id: number;
	name: string;
	members: ItemCategory[];
};

export type CreateWardrobeItem = {
	name: string;
	category_id: number;
	image_key: string;
};

export type UploadImageResponse = {
	key: string;
};

export type UserProfile = {
	name: string;
	photo_url: string;
	liked_outfit_count: number;
	wardrobe_item_count: number;
};
