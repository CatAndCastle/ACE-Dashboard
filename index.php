<?php
	if (isset($_SERVER['HTTPS']) &&
        ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) ||
        isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
        $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
      $protocol = 'https://';
    }
    else {
      $protocol = 'http://';
    }

    $http_host = str_replace("ace.", "", $_SERVER['HTTP_HOST']);
?>
<html>
<head>
	<title>ACE Dashboard</title>
	<meta name="description" content="Zero Slant: Automated News. Built from Social Media. Zero Slant organizes the world’s social posts into stories for you to experience and share.">
	<meta charset="utf-8">
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">


	<script type="text/javascript" src="lib/angular.1.5.8.min.js"></script>
	<script type="text/javascript" src="lib/angular-animate.min.js"></script>
	<script type="text/javascript" src="lib/angular-modal-service.min.js"></script>
	<script type="text/javascript" src="lib/angular-route.1.5.10.min.js"></script>
	<script type="text/javascript" src="lib/jquery-1.12.0.min.js"></script>

	<script type="text/javascript" src="js/main.js"></script>

	<script type="text/javascript" src="controllers/AceQueryController.js"></script>
	<script type="text/javascript" src="controllers/AceResultsController.js"></script>
	<script type="text/javascript" src="controllers/facebookShareController.js"></script>
	<script type="text/javascript" src="controllers/shareButtonsController.js"></script>

	<script type="text/javascript" src="js/components.js"></script>

	<link href='css/main.css' rel='stylesheet' type='text/css'>
	<link href='css/shareButtons.css' rel='stylesheet' type='text/css'>
	<link href='css/facebookShare.css' rel='stylesheet' type='text/css'>

	<link href='font/Roboto/Roboto.css' rel='stylesheet' type='text/css'>
	<link href='font/AvenirNext/AvenirNext.css' rel='stylesheet' type='text/css'>
	

	<script>
        API_BASE 	= "<?php echo $protocol . $http_host;?>/api/v0.2/";
        // API_BASE 	= "http://www.zeroslant.com/api/v0.2/";
        HOST 		= "<?php echo $protocol . $http_host;?>/";
    </script>

	

</head>
<body> 

	<div id="fb-root"></div>
	<script>
		(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8&appId=869865473112380";
		fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	</script>

	<div ng-app="ace-dashboard">

		<dashboard>
			<ng-view autoscroll="true" style="width:80%;margin:auto;position:relative;display:block;"></ng-view>
		</dashboard>
	</div>


</body>
</html>