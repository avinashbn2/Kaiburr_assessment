import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, Fade, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from 'react';
import { formatMoney } from '../../helpers';

const DataTable = ({ data, selectedRows, onCheckboxChange, handlePrevious, handleNext, currentPage, setLimit, limit }) => (

  <Fade in >
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Checked</Th>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>Salary </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && data.length > 0 ? data.map((row, index) => (
            <Tr _hover={{
              backgroundColor: '#B794F4'
            }}
              cursor='pointer' key={row.id} onClick={() => onCheckboxChange(index)}>
              <Td><Checkbox colorScheme='purple' isChecked={selectedRows.has(index)} onChange={() => onCheckboxChange(index)} /></Td>
              <Td>{row.id}</Td>
              <Td>{row.name}</Td>
              <Td textAlign='right'>{row.age}</Td>
              <Td textAlign='right'>{formatMoney(row.salary)}</Td>
            </Tr>
          )) : <Text my={4} textAlign='center' fontSize='lg'>No data to display</Text>}
        </Tbody>
      </Table>
      <Box display="flex" justifyContent="center" alignItems="center" my="4">

        {
          currentPage > 1 &&
          <Button
            colorScheme='purple'
            onClick={handlePrevious}
            disabled={currentPage === 1}
            _disabled={{
              bg: 'gray.200',
              color: 'red',
              cursor: 'not-allowed',
              opacity: 0.7,
            }}
            mr="4"
          >
            <ChevronLeftIcon color='#fff' />        Previous

          </Button>

        }

          {
          // this should be made dynamic, harcoding due to time constraints 
            currentPage< 10 &&
              <Button
                colorScheme='purple'
                disabled={currentPage === 10}
                _disabled={{
                  bg: 'gray.200',
                  color: 'black',
                  cursor: 'disabled',
                  opacity: 0.7,

                }}
                mr="4"
                onClick={handleNext}
              >
                Next <ChevronRightIcon color='#fff' />
              </Button>
          }
          < Select
          ml="4"
        width="auto"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </Select>
    </Box>

  </TableContainer>

  </Fade >
);

export default DataTable
