<?php
$objects = array();

for ($i = 1; $i <= 5; $i++) {
    $object = array(
        "color" => "lightgray",
        "date" => gmdate('Y-m-d H:i:s'),
        "user" => "game",
    );
    $objects[] = $object;
}

$jsonData = json_encode($objects);

file_put_contents('canvas.json', $jsonData);
?>