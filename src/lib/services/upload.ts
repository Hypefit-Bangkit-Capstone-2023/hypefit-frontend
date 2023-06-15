import api from '$lib/api';
import type { UploadImageResponse } from './types';

const uploadService = {
	async uploadImage(file: File): Promise<UploadImageResponse> {
		const formData = new FormData();
		formData.append('file', file);
		const res = await api.post('/v1/upload/image', formData);
		return res.data.data;
	}
};

export default uploadService;
