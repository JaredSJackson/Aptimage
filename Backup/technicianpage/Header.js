import React from 'react';

function Header() {

	let headerStyle = {
		textAlign: 'center',
		paddingTop: 100,
		paddingBottom: 25
	};

    return (
        <header style={headerStyle}>
            <h1>Aptimage</h1>
        </header>
    );
}

export default Header;