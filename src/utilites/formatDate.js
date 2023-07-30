import { format, parseISO } from 'date-fns';

const formatDate = (date) => format(parseISO(date), 'MMMM dd, yyyy');

export default formatDate;
