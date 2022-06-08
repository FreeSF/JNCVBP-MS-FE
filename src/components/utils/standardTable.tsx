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
      <ToolkitProvider hover keyField={props.keyField || "id"} data={props.data} columns={props.columns}>
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
  const { className = "", style = {}, input, ...restProps } = props;

  return (
    <Container className={className} style={style}>
      <i className="fas fa-search" />
      <input
        ref={input}
        type="text"
        onChange={(e) => {
          restProps.onSearch(e.target.value);
        }}
        style={{
          border: "none",
          outline: "none",
          boxShadow: "none",
          padding: 0,
        }}
        //placeholder={t(props.placeholder)}
      />
    </Container>
  );
};

export default StandardTable;
