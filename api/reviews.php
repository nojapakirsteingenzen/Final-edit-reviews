<?php

header("Content-Type: application/json");

$conn = new mysqli("localhost","DB_USER","DB_PASSWORD","launc43280_directory");

if ($conn->connect_error) {
    die(json_encode(["error"=>"DB connection failed"]));
}

$sql = "
SELECT *
FROM users_reviews
WHERE review_status = 2
ORDER BY review_added DESC
LIMIT 200
";

$result = $conn->query($sql);

$reviews = [];

while($row = $result->fetch_assoc()){
    $reviews[] = $row;
}

echo json_encode([
    "reviews"=>$reviews
]);

?>
