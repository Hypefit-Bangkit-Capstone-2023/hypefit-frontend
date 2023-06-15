export type ApiResponse<T> = {
	success: boolean;
	data: T;
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
