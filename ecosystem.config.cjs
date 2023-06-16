module.exports = {
	apps: [
		{
			name: 'hypefit-frontend',
			script: 'build/index.js',
			exec_mode: 'cluster',
			env: {
				PORT: '3001'
			}
		}
	]
};
