import { TTFrequency } from './tt-frequency';

export const globalFrequencyList: TTFrequency[] = [
    {
        code: 'em-dom',
        description: 'Every month - on a specific day',
        regex: /^dayOfMonth=(\d+)(?:;time=(\d+)h(\d+)m)?$/
    },
    {
        code: 'ey-doy',
        description: 'Every year - on a specific day',
        regex: /^dayOfYear=TBD$/
    }

];

