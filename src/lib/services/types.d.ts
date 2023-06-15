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
