function ActorListCtrl ($scope, $location, actorResponse) {
    'use strict';

    $scope.actors = actorResponse.data;

    $scope.add = function () {
        $location.path('/actors/new');
    };

    $scope.changePredicate('name');
}

ActorListCtrl.resolve = {
    actorResponse: function ($http) {
        'use strict';
        return $http.get('/actors');
    }
};

function ActorDetailCtrl ($scope, $http, $location, actorResponse) {
    'use strict';
    $scope.actor = actorResponse.data;

    $scope['delete'] = function () {
        $http['delete']('/actors/' + $scope.actor.id).success(function (res) {
            $location.path('/actors');
        });
    };
}

function ActorEditCtrl ($scope, $http, $location, actorResponse) {
    'use strict';
    $scope.actor = actorResponse.data;

    $scope.save = function () {
        $http.put('/actors/' + $scope.actor.id, $scope.actor)
            .success(function (res) {
                $location.path('/actors/' + $scope.actor.id);
            });
    };
}

function actorDetailResolver ($http, $route) {
    'use strict';
    var id = $route.current.params.id;
    return $http.get('/actors/' + id);
}

ActorEditCtrl.resolve = {
    actorResponse: actorDetailResolver
};

ActorDetailCtrl.resolve = {
    actorResponse: actorDetailResolver
};

function ActorAddCtrl ($scope, $http, $location) {
    'use strict';
    $scope.actor = {};
    $scope.save = function (actor) {
        $http.post('/actors', actor)
            .success(function(res) {
                $location.path('/actors/');
            });
    };
}