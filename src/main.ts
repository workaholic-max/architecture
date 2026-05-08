import { createApp } from 'vue';

import App from '@app/App.vue';
import { initApp } from '@app/init/index.ts';

import '@/assets/styles/main.scss';

const app = createApp(App);

initApp(app);

app.mount('#app');
