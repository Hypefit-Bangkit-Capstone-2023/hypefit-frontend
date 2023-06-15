import api from '$lib/api';

const recommendationService = {
	/**
	 * @typedef {import('./types').Recommendation} Recommendation
	 * @typedef {import('./types').ApiResponse<Recommendation>} ApiResponse
	 * @return {Promise<ApiResponse>}
	 */
	async getRecommendation() {
		const response = await api.get('/v1/recommendations');
		return response.data;
	}
};

export default recommendationService;
