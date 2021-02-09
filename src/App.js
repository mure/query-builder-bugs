import './App.css';

import { QueryBuilder } from 'smart-webcomponents-react/querybuilder';
import 'smart-webcomponents-react/source/styles/components/smart.querybuilder.css';

function App() {
  const onChange = event => {
    console.log(event.detail.linq);
  }

  return (
    <div className="App">
      <QueryBuilder
        customOperations={customOperations}
        getDynamicField={() => ({filterOperations: ['propertyequals']})}
        fields={fields}
        value={'partNumber = "123" && properties["dog"] = "cat"'}
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
    filterOperations: ['='],
  },
];

const customOperations = [
  {
    label: 'Equals',
    name: '=',
    expressionTemplate: '{0} = "{1}"',
  },
  {
    label: 'Equals',
    name: 'propertyequals',
    expressionTemplate: 'properties["{0}"] = "{1}"',
  }
];

export default App;
