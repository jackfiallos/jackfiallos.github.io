<?php

$id = (isset($_GET['id']) && !empty($_GET['id'])) ? $_GET['id'] : null;

const GOOGLE_API_KEY = 'YOUR_API_KEY_HERE';
$url = 'https://android.googleapis.com/gcm/send';

$subscription_ids = array();

if (!empty($id)) 
{
	array_push($subscription_ids, $id);

	$fields = array(
		'registration_ids' => $subscription_ids,
	);

	$headers = array(
		'Authorization: key=' . GOOGLE_API_KEY,
		'Content-Type: application/json'
	);

	$ch = curl_init();

	// Set the url, number of POST vars, POST data
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

	// Execute post
	$result = curl_exec($ch);

	if ($result === FALSE) {
		$data = array(
			'message' => curl_error($ch)
		);
	}
	else {
		$data = array(
			'message' => 'ok'
		);
	}

	// Close connection
	curl_close($ch);
}
else {
	$data = array(
		'message' => 'fail'
	);
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($data);
die();
?>