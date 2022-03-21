import { useState } from 'react';

const usePagination = (
  {
    data,
    initialSize = 10,
    initialPage = 1,
  },
) => {
  const [pageSize, setPageSize] = useState(initialSize);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    (currentPage - 1) * pageSize + pageSize,
  );

  return {
    paginatedData, currentPage, setCurrentPage, pageSize, setPageSize,
  };
};

export default usePagination;
