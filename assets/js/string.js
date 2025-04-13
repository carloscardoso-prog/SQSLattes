(function(){

	var StringUtil = {
		numberOnly:function(str) {
			var pattern = /\D/g;
			str = str.replace(pattern, "");
			return str;
		},
		numberForbidden:function(str) {
			var pattern = /\d/g;
			str = str.replace(pattern, "");
			return str;
		},
		isEmail:function(s) {
			var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			
			return pattern.test(s);
		},
		isCpf:function(s) {
			var value = StringUtil.numberOnly(s),
				isValid = false,
				isEqual = true,
				sum, it, pdv, sdv;
				
			if (value.length == 11) {
			
				for (var x=0, sum=0; x<9; x++) {
					it = parseInt(value.substring(x, x+1), 10);
					sum += it * (10 - x);
				}
				
				pdv = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
				
				for (var x=0, sum=0; x<10; x++) {
					it = parseInt(value.substring(x, x+1), 10);
					sum += it * (11 - x);
				}
				
				sdv = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
				
				isValid = (pdv == value.substring(9, 10)) && (sdv == value.substring(10,11));
				
				if (isValid) {
				
					for (var x=1; x<value.length; x++) {
						if (value.substring(x, x+1) != value.substring(x-1, x)) {
							isEqual = false;
							break;
						}
					}
					
					isValid = !isEqual;
				
				}
			
			}
			
			return isValid;
		}
	};
	
	window.StringUtil = StringUtil;
	
})();