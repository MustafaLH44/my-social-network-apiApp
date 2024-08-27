// Utility function to format dates
const formatDate = (date) => {
    if (!date) return '';
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
  
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  module.exports = formatDate;
  