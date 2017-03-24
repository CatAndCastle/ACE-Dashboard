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

    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	<link rel="icon" href="img/favicon.ico" type="image/x-icon">

	<script type="text/javascript" src="lib/angular.1.5.8.min.js"></script>
	<script type="text/javascript" src="lib/angular-animate.min.js"></script>
	<script type="text/javascript" src="lib/angular-modal-service.min.js"></script>
	<script type="text/javascript" src="lib/angular-route.1.5.10.min.js"></script>
	<script type="text/javascript" src="lib/jquery-1.12.0.min.js"></script>

	<script type="text/javascript" src="js/main.js"></script>

	<script type="text/javascript" src="controllers/AceQueryController.js"></script>
	<script type="text/javascript" src="controllers/AceResultsController.js"></script>
	<script type="text/javascript" src="controllers/facebookShareController.js"></script>
	<script type="text/javascript" src="controllers/SideBarController.js"></script>
	<script type="text/javascript" src="controllers/assetsController.js"></script>
	<script type="text/javascript" src="controllers/scriptController.js"></script>
	<script type="text/javascript" src="controllers/addAssetController.js"></script>
	<script type="text/javascript" src="controllers/videoController.js"></script>
	<script type="text/javascript" src="controllers/playerControlsController.js"></script>
	
	<script type="text/javascript" src="directives/buttonWithCheck.js"></script>
	<link href='directives/css/buttonWithCheck.css' rel='stylesheet' type='text/css'>
	<script type="text/javascript" src="directives/shareButton.js"></script>
	<link href='directives/css/shareButton.css' rel='stylesheet' type='text/css'>
	
	<script type="text/javascript" src="js/components.js"></script>
	
	<!-- Player JS -->
	<script type="text/javascript" src="js/editor/bodymovin.js"></script>	
	<script type="text/javascript" src="js/editor/ZSPlayer.js"></script>	

	<link href='css/main.css' rel='stylesheet' type='text/css'>
	<link href='css/facebookShare.css' rel='stylesheet' type='text/css'>
	<link href='css/sideBar.css' rel='stylesheet' type='text/css'>
	<link href='css/input.css' rel='stylesheet' type='text/css'>
	<link href='css/dashboard.css' rel='stylesheet' type='text/css'>
	<link href='css/script.css' rel='stylesheet' type='text/css'>
	<link href='css/assets.css' rel='stylesheet' type='text/css'>
	<link href='css/addAsset.css' rel='stylesheet' type='text/css'>
	<link href='css/video.css' rel='stylesheet' type='text/css'>
	<link href='css/playerControls.css' rel='stylesheet' type='text/css'>

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

		<side-bar></side-bar>
		<dashboard>
			<ng-view autoscroll="true" class='full-screen ace-results'></ng-view>
		</dashboard>
	</div>



</body>
</html>