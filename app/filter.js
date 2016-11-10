common.filter('compareArrays', function() {
    return function(arr1, arr2) {
        return arr1.filter(function(item1) {
            if (arr2.length < 1) {
				return true;
			} else {
				arr2.forEach(function(item2) {
					if (item1._id === item2._id) {
						return true;
					}
				});
				return false;
			}
        });
    };
});