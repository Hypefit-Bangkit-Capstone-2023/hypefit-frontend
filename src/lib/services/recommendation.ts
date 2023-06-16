import api from '$lib/api';
import type { Recommendation, RecommendationItem } from './types';

const recommendationService = {
	async getRecommendation(): Promise<Recommendation> {
		const response = await api.get('/v1/recommendations');
		return response.data.data;
	},

	async requestRecommendation() {
		await api.post('/v1/recommendations');
	},

	async getLikes(): Promise<RecommendationItem[]> {
		const response = await api.get('/v1/recommendations/likes');
		return response.data.data;
	},

	async like(id: number) {
		await api.post(`/v1/recommendations/${id}/like`);
	},

	async removeLike(id: number) {
		await api.delete(`/v1/recommendations/${id}/like`);
	}
};

export default recommendationService;
