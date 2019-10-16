import * as React from 'react';
import { VictoryBar } from 'victory';

class Test extends React.Component {
  render() {
    return (
      <div>
        <div>
          <VictoryBar
            height={375}
            padding={75}
            // style={{data: { ...colorSwitcher }}}
            style={{
              data: { fill: datum => (datum.y > 50 ? 'purple' : 'blue') }
            }}
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 2 },
              { x: 5, y: 1 }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Test;
