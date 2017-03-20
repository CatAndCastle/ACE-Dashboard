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

ACE.component('loader', {
	templateUrl: 'templates/loader.html'
});