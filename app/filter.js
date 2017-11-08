common.filter('compareArrays', function() {
    return function(arr1, arr2) {
        return arr1.filter(function(item1) {
            if (arr2.length < 1) {
				return true;
			} else {
				var in_arr1 = false;
				
				arr2.forEach(function(item2) {
					if (item1._id === item2._id) {
						in_arr1 = true;
					}
				});
				
				return !in_arr1;
			}
        });
    };
});