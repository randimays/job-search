export const formatDate = (date: Date = new Date()): string => {
  if (Number.isNaN(date?.getTime())) {
    return 'Invalid date';
  }

  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric'});
}