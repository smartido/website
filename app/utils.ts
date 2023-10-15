function formatDate(date: string) {
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString('ca-es', {
    month: 'short',
    year: 'numeric',
  });

  return `${fullDate}`;
}

export { formatDate };
