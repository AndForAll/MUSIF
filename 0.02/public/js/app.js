var angular = angular || {};

angular.module('myApp', ['ui.router',
'app.router',
//C O N T R O L L E R S
'app.controller.search',
//F A C T O R I E S
'app.scSearch.factory',
//D I R E C T I V E S
'app.scResults.directive'
])

.run(function($rootScope){

})
