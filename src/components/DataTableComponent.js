import React, { useState, useEffect } from "react";
import fetchData from "../services/api";
import styled from "styled-components";
import ToolbarComponent from "./ToolbarComponent";

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const DataTableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 22px;
`;

const DataTableRow = styled.tr`
  background-color: ${(props) =>
    props.$index % 2 === 0 ? "#f2f2f2" : "#ffffff"};
  height: 2rem;
`;

const DataTableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const LoadingSpinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const DataTableComponent = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const numberToShow = 20;
  const [dataToShow, setDataToShow] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then((result) => {
        setData(result.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setDataToShow(data.slice((page - 1) * numberToShow, page * numberToShow));
  }, [data, numberToShow, page]);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <DataTable>
            <thead>
              <tr>
                <DataTableHeader>Project Name</DataTableHeader>
                <DataTableHeader>Owner</DataTableHeader>
                <DataTableHeader>Stars</DataTableHeader>
                <DataTableHeader>Watchers</DataTableHeader>
                <DataTableHeader>Forks</DataTableHeader>
                <DataTableHeader>License</DataTableHeader>
              </tr>
            </thead>
            <tbody>
              {dataToShow.map((item, index) => (
                <DataTableRow key={item.id} $index={index}>
                  <DataTableCell>
                    <a href={item.html_url} target="_blank" rel="noreferrer">
                      {item.name}
                    </a>
                  </DataTableCell>
                  <DataTableCell>{item.owner.login}</DataTableCell>
                  <DataTableCell>{item.stargazers_count}</DataTableCell>
                  <DataTableCell>{item.watchers_count}</DataTableCell>
                  <DataTableCell>{item.forks}</DataTableCell>
                  <DataTableCell>
                    {item.license ? item.license.name : "N/A"}
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
          <ToolbarComponent
            total={data.length}
            numberToShow={numberToShow}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
};

export default DataTableComponent;
