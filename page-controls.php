<?php 
$path = ""; //local address of json files.
?>
<html> 
<head>
<meta charset="utf-8"> 
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
<title>Control Panel</title>
</head>
<body class="bg-dark">
<style>
input {
    padding-left: 5px;
}
.close {
    cursor: pointer;
}
</style>
<?php 
$jsonfiles = scandir($path);
array_shift($jsonfiles);
array_shift($jsonfiles);
echo "<script> var files = [";
foreach ($jsonfiles as $jsonfile) {
    $contents = file_get_contents($path . $jsonfile);
    $jsonfile = explode(".", $jsonfile);
    $jsonslug = $jsonfile[0];
    $jsontitle = ucwords(str_replace("-", " ", $jsonslug));
    echo "{content: " . "{$contents}, title : \"{$jsontitle}\", slug : \"{$jsonslug}\" }, ";
}
echo "]</script>";
echo "<script> var data = ";
echo $string;
echo "</script>";
?><div class="bg-light py-5 my-5">
       <h1 class="text-center" style="margin-top: 0">Control Panel</h1> 
	</div>
    <div style="width: 12.5%; margin-left: 2.5%; margin-right: 1.25%; float: left;">
        <div class="container bg-light py-5 mx-auto">
            <div id="file-list" class="list-group">
            </div>
        </div>
    </div>
    <div style="width: 80%; margin-left: 1.25%; margin-right: 2.5%; float: right;">
        <div class=" container-fluid bg-light py-5" style="overflow: scroll">
            <form action="<?php echo get_template_directory_uri();?>/submitcontrols.php" method="post" style="width: 100%">
                <div class="container-fluid">
                <h3 id="jsontitle" class="mt-3 mb-3">Select the JSON file listed on the left.</h3><span id="filenames" style="display:none;"> Original File Name: <span class="mr-2 font-weight-bold"> this.json </span> New File Name: <input value="that.json" style="width: 400px" name="newfilename"></span>
                <input id="jsontitleinput" type="text" style="display: none">
                    <table class="table my-3">
                    <thead>
                    </thead>
                    <tbody>
                    </tbody>
                    </table>
                    <button id="submit-button" type="submit" class="btn btn-default mb-3" style="display: none">Submit</button>
                    <button id="add-button" type="button" class="btn btn-default mb-3" style="display: none">Add Row</button>
                </div>
            </form>
        </div>
    </div>
<script src="<?php echo get_template_directory_uri(); ?>/controls.js"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
</body>
</html>