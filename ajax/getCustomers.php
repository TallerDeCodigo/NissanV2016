<?php

include('../includes/config.php');


                       

$query = "SELECT Fecha, Status, NoTicket, NoParte, Fecha FROM sad_tktunidadinm ORDER BY Fecha DESC LIMIT 100; " ;

$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;	
	}
}


# JSON-encode the response
$json_response = json_encode($arr);

// # Return the response
echo $json_response;
?>
