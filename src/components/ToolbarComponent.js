import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Toolbar = styled.div`
  width: 100% !important;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 21px;
`;

const PageNumber = styled.span`
  cursor: ${(props) => (props.$current ? "" : "pointer")};
  text-decoration-line: ${(props) => (props.$current ? "underline" : "none")};
  font-weight: ${(props) => (props.$current ? "bold" : "normal")};
`;

const ArrowIcon = styled.span`
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.$disabled ? "#ccc" : "#000")};
`;

const ToolbarComponent = ({ numberToShow, page, setPage, total }) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(total / numberToShow));
  }, [total, numberToShow]);

  const handleChangePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === page)
      return;
    setPage(pageNumber);
  };

  return (
    <Toolbar>
      <ArrowIcon
        $disabled={page <= 1}
        onClick={() => handleChangePage(page - 1)}
      >
        &#10094;
      </ArrowIcon>
      {[...Array(totalPages).keys()].map((pageNumber) => (
        <PageNumber
          key={pageNumber}
          $current={page === pageNumber + 1}
          onClick={() => handleChangePage(pageNumber + 1)}
        >
          {pageNumber + 1}
        </PageNumber>
      ))}
      <ArrowIcon
        $disabled={page >= totalPages}
        onClick={() => handleChangePage(page + 1)}
      >
        &#10095;
      </ArrowIcon>
    </Toolbar>
  );
};

export default ToolbarComponent;
