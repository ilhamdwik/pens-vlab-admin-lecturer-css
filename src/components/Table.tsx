import React from "react";
import { Column, useTable, useExpanded, Row } from "react-table";
import ReactPaginate from "react-paginate";

export const Table = ({
  columns,
  data,
  renderRowSubComponent,
  pagination,
  paginationCount,
  onChangePage,
  currentPage,
}: {
  columns: Column[];
  data: any[];
  renderRowSubComponent: ({ row }: { row: Row<object> }) => React.ReactNode;
  pagination?: boolean;
  paginationCount?: number;
  onChangePage?: (page: number) => void;
  currentPage?: number;
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    visibleColumns,

    prepareRow,
  } = useTable({ columns, data }, useExpanded);

  return (
    <div className="w-full overflow-x-scroll ">
      <table
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-800"
        {...getTableProps()}
      >
        <thead className="bg-gray-50 dark:bg-blueGray-700">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {pagination && paginationCount && onChangePage && currentPage ? (
                <th
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider w-2`}
                >
                  No
                </th>
              ) : null}
              {headerGroup.headers.map((column) => (
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody
          className="bg-white dark:bg-blueGray-800 divide-y divide-gray-200 dark:divide-blueGray-700"
          {...getTableBodyProps()}
        >
          {rows.map((row, i) => {
            prepareRow(row);

            return (
              <>
                <tr {...row.getRowProps()} key={row.id}>
                  {pagination &&
                  paginationCount &&
                  onChangePage &&
                  currentPage ? (
                    <td className={`px-6 py-4 whitespace-pre-wrap break-words`}>
                      {i + (currentPage - 1) * 10 + 1}.
                    </td>
                  ) : null}
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        className={`px-6 py-4 whitespace-pre-wrap break-words`}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </>
            );
          })}
        </tbody>
      </table>
      {pagination && paginationCount && onChangePage && currentPage ? (
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end gap-6 my-2">
          <div className="text-blueGray-400 dark:text-blueGray-500">
            Showing data {(currentPage - 1) * 10 + 1} -{" "}
            {data.length === 10
              ? currentPage * 10
              : (currentPage - 1) * 10 + data.length}
          </div>
          <ReactPaginate
            pageCount={Math.ceil(paginationCount / 10)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => onChangePage(selected + 1)}
            initialPage={currentPage - 1}
            disableInitialCallback
            containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            pageLinkClassName={`border-gray-300  text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:border-gray-600 dark:text-gray-200 dark:hover:bg-blueGray-700 `}
            previousLinkClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-blueGray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-blueGray-700"
            nextLinkClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-blueGray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-blueGray-700"
            activeLinkClassName="bg-indigo-100 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-blueGray-700 dark:border-blueGray-700 dark:text-gray-200 dark:hover:bg-blueGray-700"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Table;
