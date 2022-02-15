
import React from "react";
import BootstrapTable, {ColumnDescription} from "react-bootstrap-table-next";

interface TheProps {
  columns: ColumnDescription<any, any>[],
  data: any[],
  keyField?: string
}

const StandardTable: React.FC<TheProps> = props => {

  return (
    <div>
      A Table
      <BootstrapTable
          keyField={props.keyField || 'id'}
          data={props.data}
          columns={props.columns}
      />
    </div>
  )
}

export default StandardTable;