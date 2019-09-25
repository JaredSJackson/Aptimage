<?php


$serverName = "localhost"; //serverName\instanceName
$connectionInfo = array( "Database"=>"Aptimage", "UID"=>"sa", "PWD"=>"Wash9Lives!");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
     echo "Connection established.<br />";
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>