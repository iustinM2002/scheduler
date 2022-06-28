import React,{useMemo} from 'react'
import {useTable} from 'react-table';

const data = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  );
  const columns:any = useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    []
  );
const Table = () => {
    const {rows,prepareRow,getTableBodyProps,getTableProps,headerGroups} = useTable({columns,data})
  return (
    <div>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup =>
                <th {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column =>
                    <td {...column.getHeaderProps()}>
                        {column.render('Header')}
                    </td>
                    )}
                </th>
                )} 
            </thead>
            <tbody>
                <tr>
                    <td>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Table