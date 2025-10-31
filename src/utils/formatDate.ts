import { format, parseISO } from 'date-fns';



// Helper function to safely format dates
export const formatDate = (dateString: string | Date) => {
  try {
    // Handle both string and Date objects
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

