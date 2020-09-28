import { TTFrequency } from './tt-frequency';

var dowRegex = /(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)/;

export const globalFrequencyList: TTFrequency[] = [
    {
        code: 'em-dom',
        description: 'Every month - on a specific day',
        regex: /^dayOfMonth=(\d+)(?:;time=(\d+)h(\d+)m)?$/
    },
    {
        code: 'ew-dow',
        description: 'Once every week',
        regex: /^dayOfWeek=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)\|everyWeek(?:;time=(\d+)h(\d+)m)?$/
    },
    {
        code: 'exw-dow',
        description: 'Once every (2, 3 or 4) weeks',
        regex: /^dayOfWeek=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)\|everyXWeeks=([234])(?:;time=(\d+)h(\d+)m)?$/
    },
    {
        code: 'ey-doy',
        description: 'Every year - on a specific day',
        regex: /^dayOfYear=TBD$/
    }

];

