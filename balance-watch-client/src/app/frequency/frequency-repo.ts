import { TTFrequency } from './tt-frequency';

var dowRegex = /(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)/;

export const globalFrequencyList: TTFrequency[] = [
    {
        code: 'ew-dow',
        description: 'Once a week',
        regex: /^dayOfWeek=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)\|everyWeek(?:;time=(\d+)h(\d+)m)?$/
    },
    {
        code: 'exw-dow',
        description: 'Once every (2, 3 or 4) weeks',
        regex: /^dayOfWeek=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)\|everyXWeeks=([234])(?:;time=(\d+)h(\d+)m)?$/
    },
    {
        code: 'em-dom',
        description: 'Once a month: on a specific day',
        regex: /^dayOfMonth=(\d+)(?:;time=(\d+)h(\d+)m)?$/
    },
    {
        code: 'em-dowap',
        description: 'Once a month: position in the month for a day of week',
        regex: /^dayOfWeek=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)(?:;time=(\d+)h(\d+)m)?\|at\|rank=([12345]{1}|LAST)$/
    },
    {
        code: 'em-dowadom',
        description: 'Once a month: on a day of week  - after a specific day of month',
        regex: /^dayOfWeek=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)\|after\|dayOfMonth=(\d+)(?:;time=(\d+)h(\d+)m)?$/
    },
    {
        code: 'em-domwr',
        description: 'Once a month: on a specific day - with conditions for the day of week',
        regex: /^dayOfMonth=(\d+)(?:;time=(\d+)h(\d+)m)?\|report\|(?:from1=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY);to1=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)(?:;from2=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY);to2=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)(?:;from3=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY);to3=(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY))?)?)?$/
    },
    {
        code: 'ey-doy',
        description: 'Once a year: on a specific day',
        regex: /^dayOfYear=([1-9]|1[012])-([1-9]|[12][0-9]|3[01])(?:;time=(\d+)h(\d+)m)?$/
    }
];

