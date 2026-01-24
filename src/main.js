import { createApp } from 'vue';

import { initApp } from '@/app/init/index.js';
import App from '@/app/App.vue';

import '@/assets/styles/main.scss';

const app = createApp(App);

initApp(app);

app.mount('#app');
