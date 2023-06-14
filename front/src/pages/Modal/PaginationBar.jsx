import React from 'react';
import { Pagination } from 'react-bootstrap';

const PagenationBar = ({ content, totalPages, handlePageChange, currentPage }
) => {
  // 페이지네이션 아이템 생성 함수
  console.log("totalPages")
  const renderPaginationItems = () => {
    // console.log(currentPage);
    // const totalPages = totalPages2;
    const paginationItems = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    // console.log(paginationItems);
    return paginationItems;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* 페이지네이션 컴포넌트 */}
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
        {renderPaginationItems()}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
  );
};

export default PagenationBar;