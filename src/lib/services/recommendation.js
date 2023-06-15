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
	},

	/**
	 * @param {number} id
	 * @return {Promise<import('./types').ApiResponseNoData>}
	 */
	async like(id) {
		const response = await api.post(`/v1/recommendations/${id}/like`);
		return response.data;
	},

	/**
	 * @param {number} id
	 * @return {Promise<import('./types').ApiResponseNoData>}
	 */
	async removeLike(id) {
		const response = await api.delete(`/v1/recommendations/${id}/like`);
		return response.data;
	}
};

export default recommendationService;
