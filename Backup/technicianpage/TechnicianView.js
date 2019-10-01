import React from 'react';
import Header from './Header';
import Main from './Main';

function TechnicianView() {

	let appStyle = {
		textAlign: 'center',
		paddingBottom: 300,
		paddingTop: 100
	};

  return (
    <div className="TechnicianView">
        <Header />
        <Main />
    </div>
  );
};

export default TechnicianView;
