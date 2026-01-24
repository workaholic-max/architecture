import { Chart, ArcElement, PointElement, LineElement, Legend, Tooltip, CategoryScale, LinearScale } from 'chart.js';

export const initPackages = () => {
    Chart.register(ArcElement, PointElement, LineElement, Legend, Tooltip, CategoryScale, LinearScale);
};
