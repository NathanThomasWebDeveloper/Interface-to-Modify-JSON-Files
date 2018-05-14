<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Create JSON</title>
</head>
<body>
<?php

$file = "/var/www/vhosts/sparklebox.co.uk/httpdocs/wp-content/themes/sparklebox/json/" . $_POST["newfilename"];
unset($_POST["newfilename"]);
var_dump($_POST);
$array = array();
$arrayNumber = 0;
foreach ($_POST as $key => $value) {
    if($value == "undefined")
    { 
        continue; 
    } 
    $pieces = explode("-", $key);
    $count = count($pieces)-1;
    $newValue = $pieces[$count];
    array_pop($pieces);
    $newKey = implode("-", $pieces);
    $toCheck = substr($newKey, 0, 2);
    $toCheck2 = substr($value, 0, 1);
    if ($toCheck == "xx"){ 
        $newKey = ltrim($newKey, 'x');
        $newKey = ltrim($newKey, 'x');
    }
     if ($toCheck2 == "["){
         $value = json_decode($value, true);        
     }
    if(($newKeytoCheck !== $newKey) and ($newKeytoCheck)){
        $arrayNumber++;
    } 
    if ($newValue != "name") {
    $array[$newKey][$newValue] = $value;
    }
    $newKeytoCheck = $newKey;
}

echo "<h4> JSON file successfully created at : " . $file;
file_put_contents($file, json_encode($array, true));
?>

</body>
</html>