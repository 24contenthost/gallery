import {createPinia} from 'pinia';
import persistedState from 'pinia-plugin-persistedstate';

// Создание Pinia хранилища с плагином
const pinia = createPinia();
pinia.use(persistedState);  // Подключаем плагин

export default pinia;
