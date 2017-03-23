/**
    <share-button>
    Share page link to social media
*/
ACE.component('shareButton', {
    templateUrl: 'templates/shareButtons.html',
    controller: ['$scope', '$window', '$attrs', '$element', 'ModalService', ShareButtonsController]
});

ACE.component('sideBar', {
    templateUrl: 'templates/sidebar.html',
    controller: ['$scope', '$window', '$http', '$rootScope', SideBarController]
});

ACE.component('aceDashboard', {
	templateUrl: 'templates/aceResults.html',
	controller: ['$scope', '$http', '$timeout', '$routeParams', '$rootScope', AceResultsController]
});

ACE.component('loader', {
	templateUrl: 'templates/loader.html'
});

ACE.component('playerControls', {
	templateUrl: 'templates/playerControls.html',
	controller: ['$scope', PlayerControlsController]
});

ACE.component('assets', {
	templateUrl: 'templates/assets.html',
	controller: ['$scope', '$window', '$rootScope', '$http', 'ModalService', AssetsController]
});

ACE.component('aceScript', {
	templateUrl: 'templates/script.html',
	controller: ['$scope', '$window', '$rootScope', '$http', '$timeout', ScriptController]
});

ACE.component('aceVideo', {
	templateUrl: 'templates/video.html',
	controller: ['$scope', '$window', '$rootScope', '$http', '$timeout', videoController]
});