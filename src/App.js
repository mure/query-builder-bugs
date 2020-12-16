import './App.css';

import { QueryBuilder } from 'smart-webcomponents-react/querybuilder';
import 'smart-webcomponents-react/source/styles/components/smart.querybuilder.css';
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('programName = "test"');

  const onChange = event => {
    console.log(event.detail.linq);
    setValue(event.detail.linq);
  }

  return (
    <div className="App">
      <QueryBuilder
        customOperations={customOperations}
        fields={fields}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

const fields = [
  {
    label: 'Part Number',
    dataField: 'partNumber',
    dataType: 'string',
    filterOperations: ['=', '<>'],
  },
  {
    label: 'Test Program',
    dataField: 'programName',
    dataType: 'string',
    filterOperations: ['=', '<>'],
  },
  {
    label: 'Started At',
    dataField: 'startedAt',
    dataType: 'string',
    filterOperations: ['>'],
    lookup: {
      // These don't work
      dataSource: ['${__from:date}', '${__to:date}', '${__from:date:YYYY-MM-DD}', '${__to:date:YYYY-MM-DD}'],
    }
  },
  {
    label: 'Status',
    dataField: 'status.statusType',
    dataType: 'string',
    filterOperations: ['=', '<>'],
    lookup: {
      dataSource: [
        // this doesn't work
        { label: 'Fancy label', value: 'uglyValue' },
      ],
      readonly: true
    }
  },
  {
    label: 'Operator',
    dataField: 'operator',
    dataType: 'string',
    filterOperations: ['=', '<>'],
    // this doesn't work :(
    lookup: {
      dataSource: (query) => {
        return new Promise(resolve => {
          setTimeout(() => resolve(['cat', 'dog', 'zebra']));
        })
      }
    }
  },
];

const customOperations = [
  {
    label: 'Equals',
    name: '=',
    expressionTemplate: '{0} = "{1}"',
  },
  {
    label: 'Does not equal',
    name: '<>',
    expressionTemplate: '{0} != "{1}"',
  },
  {
    label: 'Greater than',
    name: '>',
    expressionTemplate: '{0} > {1}',
  },
];

export default App;
