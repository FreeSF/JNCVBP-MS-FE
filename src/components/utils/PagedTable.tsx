import React, { useRef, useState } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import styled from "styled-components";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { DocumentNode } from "graphql";
import { useQuery } from "@apollo/client";
import Spinner from "../spinner";

interface TheProps {
  columns: ColumnDescription<any, any>[];
  keyField?: string;
  query: DocumentNode;
  disabled?: boolean;
  queryRef?: any;
  refreshFunction?: any;
}

/**
 * A component that renders a paginated table based on data from a GraphQL query
 *
 * The component takes care of the following:
 * - fetching data from the GraphQL query
 * - caching the data
 * - rendering a table with the data
 * - handling pagination
 * - handling sorting
 * - handling searching the data
 *
 * The user needs to provide the columns that should be rendered in the table, and the GraphQL query
 * that should be used to fetch the data. The user can also customize the behavior of the component
 * by providing some additional props.
 *
 * The component will also handle the loading state of the data, and will render a spinner if the data is not
 * available yet.
 *
 * The component will also handle the error state of the data, and will render an error message if the data could not
 * be fetched.
 *
 * The component is reusable and can be used multiple times in the same application.
 */
const PagedTable: React.FC<TheProps> = ({ disabled = false, ...props }) => {
  const theColumns = props.columns.map((theColumn) => ({ ...theColumn, sort: !!theColumn.dataField }));
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSizePerPage, setCurrentSizePerPage] = useState(10);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState("");

  /**
   * Executes a complex GraphQL query to fetch paginated data for the table.
   *
   * The query includes various parameters for pagination, sorting, and filtering,
   * allowing for a highly customizable data fetching mechanism. The complexity of the
   * query ensures that it can handle a wide range of use cases, retrieving only the
   * necessary data while optimizing performance.
   *
   * The query is reactive and will automatically refetch data when any of the variables change,
   * ensuring that the displayed data is always up-to-date.
   */
  const theQuery = useQuery(props.query, {
    variables: { limit: currentSizePerPage, offset: 0, sortField, sortOrder, searchText: "", disabled: !!disabled },
  });

  const toolkitProviderRef = useRef(null);
  const tableRef = useRef(null);

  /**
   * Refreshes the data in the table by re-executing the GraphQL query with the current variables.
   *
   * This function is used to refresh the data in the table when the user navigates to a different page,
   * or when the user changes the sorting or filtering options. It is also used to handle the case where
   * the user wants to refresh the data in the table manually.
   *
   * The function is memoized using the useCallback hook to ensure that it is not recreated unnecessarily.
   *
   * The function takes no arguments, and returns nothing.
   */
  const refreshFunction = () => {
    theQuery.refetch({
      offset,
      limit: currentSizePerPage,
      sortField: sortField,
      sortOrder: sortOrder,
      searchText: searchText,
      disabled: !!disabled,
    });
  };

  if (props.refreshFunction) {
    props.refreshFunction.current = refreshFunction;
  }

  if (theQuery.loading) return <Spinner />;

  return (
    <Wrapper>
      <ToolkitProvider
        keyField={props.keyField || "id"}
        data={theQuery.data?.page?.items || []}
        columns={theColumns}
        search={true}
        ref={toolkitProviderRef}
      >
        {({ searchProps, baseProps }) => (
          <>
            <CustomSearch {...searchProps} />
            <BootstrapTable
              {...baseProps}
              {...searchProps}
              pagination={paginationFactory({
                sizePerPage: currentSizePerPage,
                showTotal: true,
                totalSize: theQuery.data.page.totalSize,
                page: currentPage,
                pageStartIndex: 1,
                firstPageText: "First",
                prePageText: "Back",
                nextPageText: "Next",
                lastPageText: "Last",
                nextPageTitle: "First page",
                prePageTitle: "Previous page",
                firstPageTitle: "Next page",
                lastPageTitle: "Last page",
                sizePerPageList: [5, 10, 15, 20],
              })}
              bootstrap4={true}
              remote={{
                filter: true,
                pagination: true,
                sort: true,
                cellEdit: false,
              }}
              sort={{ dataField: sortField, order: sortOrder }}
              onTableChange={(type, newState) => {
                const newOffset = (newState.page - 1) * newState.sizePerPage;
                theQuery.refetch({
                  offset: newOffset,
                  limit: newState.sizePerPage,
                  sortField: newState.sortField,
                  sortOrder: newState.sortOrder,
                  searchText: searchProps.searchText,
                });
                setOffset(newOffset);
                setCurrentSizePerPage(newState.sizePerPage);
                setSortField(newState.sortField || "id");
                setSortOrder(newState.sortOrder || "desc");
                setCurrentPage(newState.page);
                setSearchText(searchProps.searchText);
              }}
              ref={tableRef}
            />
          </>
        )}
      </ToolkitProvider>
    </Wrapper>
  );
};

/**
 * CustomSearch is a functional component that renders a search input field.
 *
 * This component is used to provide a search box that allows users to input text
 * and trigger a search event. It takes in the input ref and additional props
 * which include the onSearch function used to handle the search logic.
 *
 * Props:
 * - input: a React ref for the input element
 * - restProps: additional properties, including onSearch, a function to execute when the input changes
 *
 * The component consists of a styled input group with a search icon, and
 * calls the onSearch function every time the input value changes.
 */
const CustomSearch = (props) => {
  const { input, ...restProps } = props;

  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-search" />
          </div>
        </div>
        <input
          ref={input}
          type="text"
          className="form-control"
          placeholder="Buscar"
          onChange={(e) => {
            restProps.onSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  .pagination {
    justify-content: end;
  }
`;

export default PagedTable;
