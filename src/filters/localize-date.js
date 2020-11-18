module.exports = (Vue) => {
  const lang = navigator.language || 'en-us';

  const isValidDate = (date) => (date instanceof Date && !Number.isNaN(date));

  Vue.filter('fullDate', (date) => {
    if (!isValidDate(date)) {
      console.warn('The value to be filtered must be a valid date object.');
      return date;
    }
    return new Intl.DateTimeFormat(lang, {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  });

  Vue.filter('hour', (date) => {
    if (!isValidDate(date)) {
      console.warn('The value to be filtered must be a valid date object.');
      return date;
    }
    return new Intl.DateTimeFormat(lang, {
      timeStyle: 'short',
    }).format(date);
  });
};
