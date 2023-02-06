const useFormat = () => {

  const formatDate = (UNIX_timestamp: string) => {
    const timeValue = new Date(UNIX_timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return timeValue.toLocaleDateString('vi', options as any);
  };

  const formatShortDate = (UNIX_timestamp: string) => {
    const timeValue = new Date(UNIX_timestamp);
    return timeValue.toLocaleDateString('vi');
  };

  const formatNumberWithDot = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return {
    formatDate,
    formatShortDate,
    formatNumberWithDot,
  };
};

export default useFormat;
