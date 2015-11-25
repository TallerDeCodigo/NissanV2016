<?php

/**
 * Created on 26/05/2015
 * @author Hever Gonz‡lez Ochoa <hever.g@lisa.com.mx>
 * @version 1.0
 * @copyright Copyright &copy; 2015, lisa.com.mx
 */
date_default_timezone_set('America/Monterrey');	

//Conexión DB
include('../includes/config.php');


//Obtenemos acción 
$action = $_GET['token'];

	$IntDias = 5;
	$where = " AND ( tp.Status !=3 OR (tp.Status =3 AND DATE_SUB( CURDATE( ) , INTERVAL ".$IntDias." DAY ) <= tp.FechaMod))";

	$query = "SELECT tp.*, sa.Clave FROM sad_tktbackorder AS tp 
			LEFT JOIN sad_agencias as sa ON sa.Id = tp.sad_agenciasId 
			LEFT JOIN sad_tktbackorder_resp as tpr ON tpr.NoTicket = tp.NoTicket  
			where tp.Id<>0 $where GROUP BY tp.NoTicket ORDER BY Id DESC;" ;

	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$arr = array();
	if($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {

			$status	= $row['Status'];
			switch ($status) {
				case '1':
					$row['Status'] = "En espera";
					$row['Color'] = "label-danger";
					break;
				case '2':
					$row['Status'] = "Revisado por analista"; 
					$row['Color'] = "label-danger";
					break;
				case '3':
					$row['Status'] = "Resuelta"; 
					$row['Color'] = "label-success";
					break;
				case '4':
					$row['Status'] = "Revisado por analista"; 
					$row['Color'] = "label-warning";
					break;
				case '5':
					$row['Status'] = "En proceso"; 
					$row['Color'] = "label-warning";
					break;
				case '6':
					$row['Status'] = "En proceso"; 
					$row['Color'] = "label-warning";
					break;		
				case '7':
					$row['Status'] = "En proceso"; 
					$row['Color'] = "label-warning";
					break;			
				case '8':
					$row['Status'] = "En proceso"; 
					$row['Color'] = "label-warning";
					break;			
				case '9':
					$row['Status'] = "En proceso"; 
					$row['Color'] = "label-warning";
					break;			
				case '10':
					$row['Status'] = "En proceso"; 
					$row['Color'] = "label-warning";
					break;			
				case '20':
					$row['Status'] = "Incremento"; 
					$row['Color'] = "label-danger";
					break;
				case '21':
					$row['Status'] = "Discrepancia"; 
					$row['Color'] = "label-danger";
					break;
				case '22':
					$row['Status'] = "Embarque";
					$row['Color'] = "label-danger";
					break;
				case '23':
					$row['Status'] = "Info Tech.";
					$row['Color'] = "label-info";
					break;
				case '24':
					$row['Status'] = "Compras";
					$row['Color'] = "label-danger";
					break;
				case '25':
					$row['Status'] = "FOM"; 
					$row['Color'] = "label-danger";
				
				default:
					# code...
					break;
			}


			if($row['Fecha1'] == '0000-00-00') $row['Fecha1'] = '';
			if($row['Fecha2'] == '0000-00-00') $row['Fecha2'] = '';
			if($row['Fecha3'] == '0000-00-00') $row['Fecha3'] = '';


			$row['Agencia'] = str_pad($row['Clave'], 4, "0", STR_PAD_LEFT);

			$arr[] = $row;	
		}
	}
	# JSON-encode the response
	$json_response = json_encode($arr);
	// # Return the response
	echo $json_response;
          



?>
