import { ChakraProvider, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import './App.css';
import BarChart from './components/BarChart';
import DataTable from "./components/DataTable";
import StatContext from "./context/StatContext";
import useFetchData from "./hooks/useFetchData";
const App = () => {
  // const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, error, setParams } = useFetchData('http://localhost:4000/api/data', { currentPage: 1, limit: 10 });

  const handleLimitChange = (newLimit) => {
    setParams({ currentPage: 1, limit: newLimit });
    setCurrentPage(1); // Reset currentPage to 1
    setLimit(newLimit); // Update limit state
  };

  const handlePageChange = (newPage) => {
    setParams(params => ({ ...params, currentPage: newPage }));
    setCurrentPage(newPage); // Update currentPage state
  };


  const handleCheckboxChange = (index, checked) => {
    let newSelectedRows = new Set(selectedRows)
    if (selectedRows.has(index)) {
      newSelectedRows.delete(index)
    } else {
      newSelectedRows.add(index)
    }
    setSelectedRows(newSelectedRows);
  };

  const filteredDataForChart = data.filter((_, index) => selectedRows.has(index));

  const handlePrevious = () => {
    handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage);

  };

  useEffect(()=> {
    setSelectedRows(new Set())
  },[currentPage])
  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <ChakraProvider>
      <StatContext.Provider value={data}>

        <Text fontWeight='bold' my={2} fontSize="xl">Kaiburr Assessment</Text>
        <div className="container">
          <div className="container_datatable">
            <DataTable
              selectedRows={selectedRows}
              limit={limit}
              currentPage={currentPage}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              data={data}
              onCheckboxChange={handleCheckboxChange}
              setLimit={handleLimitChange} />
          </div>
          <div className="container_barchart">
            <BarChart filteredData={filteredDataForChart} />
          </div>
        </div>
      </StatContext.Provider>
    </ChakraProvider>
  );
};

export default App;
