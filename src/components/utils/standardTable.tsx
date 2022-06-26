import React from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import { Container } from "react-bootstrap";

interface TheProps {
  columns: ColumnDescription<any, any>[];
  data: any[];
  keyField?: string;
}

const StandardTable: React.FC<TheProps> = (props) => {
  return (
    <div>
      <ToolkitProvider hover keyField={props.keyField || "id"} data={props.data} columns={props.columns} search>
        {({ searchProps, baseProps }) => (
          <React.Fragment>
            <CustomSearch {...searchProps} />
            <BootstrapTable {...baseProps} {...searchProps} />
          </React.Fragment>
        )}
      </ToolkitProvider>
    </div>
  );
};

const CustomSearch = (props) => {
  const { input, ...restProps } = props;

  return (
    <input
      ref={input}
      type="text"
      onChange={(e) => {
        restProps.onSearch(e.target.value);
      }}
      style={{
        marginBottom: "10px",
      }}
      className="form-control"
      placeholder="Buscar"
    />
  );
};

export default StandardTable;
