import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'vant/lib/index.css'
import { RadioGroup, Radio, Popup, List } from 'vant';
const app = createApp(App)

app.use(createPinia())
app.use(Radio);
app.use(RadioGroup); 
app.use(Popup);
app.use(List);


app.mount('#app')
