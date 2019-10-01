<?php

$to = "mikeyvnguyen@yahoo.com";
$subject = "Aptimage Connection"
$message = "Use this unique code to connect to the technician: "
$headers = "From: mail.aptimage@gmail.com\r\n";
if(mail($to, $subject, $message, $headers)) {
	echo "SUCCESS";
} else {
	echo "ERROR";
};

?>