import React from 'react';

class Main extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			myCode: null,
			firstName: "",
			lastName: "",
			phoneNumber: "",
			email: "",
			error: "",
			mailSent: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit(event) {
		event.preventDefault();
	}

	getRandomCode = () => {
		var code = Math.floor(100000 + (Math.random() * 899999));
		this.setState({
			myCode: code
		});
	}

	sendToDB = () => {
		var userData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			phoneNumber: this.state.phoneNumber,
			email: this.state.email
		}
		var sendCode = {
			VerificationCode: this.state.myCode,
			HostSDP: "",
			RemoteSDP: ""
		}

		try {
			fetch('https://aptimage.net/API/AddUserInfo.aspx', {
				method: 'POST',
				mode: 'no-cors',
				body: JSON.stringify(userData),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(response => console.log("Successfully Sent User Data"));
		} catch(error) {
			console.error('Error:', error);
		}

		try {
			fetch('https://aptimage.net/API/PostConnectionInfo.aspx', {
				method: 'POST',
				mode: 'no-cors',
				body: JSON.stringify(sendCode),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(response => console.log("Successfully Sent Code"));
		} catch(error) {
			console.error('Error:', error);
		}

	}

    render() {

		let userDataStyle = {
			textAlign: "right",
			paddingTop: 5,
			paddingRight:700
		};

		let codeStyle = {
			textAlign: "right",
			paddingTop: 5,
			paddingRight:700
		};

		let optionStyle = {
			textAlign: "left",
			paddingLeft: 700
		};

		return (
        <div>
            <div style={userDataStyle}>
                First Name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} /><br />
                Last Name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} /><br />
                Phone Number: <input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} /><br />
                Email: <input type="text" name="email" value={this.state.email} onChange={this.handleChange} /><br />
            </div>
            <div style={codeStyle}>
				<form onSubmit={this.handleSubmit}>
					<label>{this.state.firstName} {this.state.lastName} {this.state.phoneNumber} {this.state.email}</label><br />
					<div style={optionStyle}>
						Send code by:<br />
						<input type="radio" name="sendType" value="sendEmail" defaultChecked /> Email<br />
						<input type="radio" name="sendType" value="sendText" /> Text Message<br /><br />
						<button onClick={this.getRandomCode} name="generateCode">Generate Code</button> <label name="code">Code is: {this.state.myCode}</label><br />
						<button onClick={this.sendToDB} name="sendToDB">Send to DataBase</button><br />
					</div>
				</form>
            </div>
        </div>
		);
    }
}

export default Main;