<?php

//should be connected to DB now
require "Config.php";

//executing a database query will save "" in field tblAddressBook.addr2
$sql = "INSERT INTO ConnectionInfo (VerificationCode, HostSDP, RemoteSDP) VALUES (?, ? , ?)";
$verificationCode = $_POST['VerificationCode'];
$hostSDP = $_POST['HostSDP'];
$remoteSDP = $_POST['RemoteSDP'];

$params = array($verificationCode, $hostSDP, $remoteSDP);
$sql_srv_query($conn, $sql, $params);

// //maybe needs more fields and what is CID?
// $sql="INSERT INTO `Contact Information` (`First Name`, `Last Name`, `Home Phone`, 
// `Work Phone`, `Cell Phone`, `Personal Email`, `Work Email`, `Address`, `UID`)".
//     "VALUES (? , ?, ?, ?, ?, ?, ?, ?, ?)";
// $userId = $_SESSION['userid'];
// $firstName = $_POST['First'];
// $lastName = $_POST['Last'];
// $homePhone = $_POST['HomePhone'];
// $workPhone = $_POST['WorkPhone'];
// $cellPhone = $_POST['CellPhone'];
// $homeEmail = $_POST['HomeEmail'];
// $workEmail = $_POST['WorkEmail'];
// $address = $_POST['Address'];
// $UID = $_POST['userid'];

?>
