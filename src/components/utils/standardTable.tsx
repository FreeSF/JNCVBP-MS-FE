import React from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import styled from "styled-components";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

interface TheProps {
  columns: ColumnDescription<any, any>[];
  data: any[];
  keyField?: string;
}

// Old Table, Deprecated
const StandardTable: React.FC<TheProps> = (props) => {
  const theColumns = props.columns.map((theColumn) => ({ ...theColumn, sort: !!theColumn.dataField }));
  return (
    <Wrapper>
      <ToolkitProvider
        hover
        keyField={props.keyField || "id"}
        data={props.data}
        columns={theColumns}
        search={{ searchFormatted: true }}
      >
        {({ searchProps, baseProps }) => (
          <React.Fragment>
            <CustomSearch {...searchProps} />
            <BootstrapTable {...baseProps} {...searchProps} pagination={paginationFactory()} bootstrap4={true} />
          </React.Fragment>
        )}
      </ToolkitProvider>
    </Wrapper>
  );
};

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

export default StandardTable;
