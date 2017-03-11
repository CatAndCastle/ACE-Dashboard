/**
    <share-button>
    Share page link to social media
*/
ACE.component('shareButton', {
    templateUrl: 'templates/shareButtons.html',
    controller: ['$scope', '$window', '$attrs', '$element', 'ModalService', ShareButtonsController]
});