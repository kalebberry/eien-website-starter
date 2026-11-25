export default {
  testDir: './tests/browser',
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 4321', url: 'http://127.0.0.1:4321', reuseExistingServer: false },
  use: { baseURL: 'http://127.0.0.1:4321' },
  projects: ['chromium','firefox','webkit'].map(browserName => ({ name: browserName, use: { browserName } }))
};
