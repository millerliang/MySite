$( ".overflow, .trem_btn" ).hide();

jQuery(document).ready(function($){
	$( ".trem" ).click(function() {
		$('.show_trem, .trem_btn').fadeIn(300);
		$('.wrap').fadeOut();
	});

	$( ".close-btn, .show_trem" ).click(function() {
		$('.overflow, .show_trem, .trem_btn').fadeOut(500);
		$('.wrap').fadeIn(800);
	});

	$( ".overflow" ).click(function() {
		$(this).fadeOut(800);
	});

	$( ".msg" ).click(function() {
		$(this).fadeOut(800);
	});

});

function checkValidate(field,rules,num){
	var validation = true;
	switch (rules) {
	case "required":
		validation = _required(field);
		break;
	case "email":
		validation = _format(field,"email");
		break;
	case "mobile":
		validation = _format(field,"mobile");
		break;
	case "onlyNumberSp":
		validation = _format(field,"onlyNumberSp");
		break;
	case "onlyLetterNumber":
		validation = _format(field,"onlyLetterNumber");
		break;
	case "date":
		validation = _format(field,"date");
		break;
	case "size":
		var field_val = $.trim(field.val());
		return (field_val.length==num*1);
	case "minSize":
		var field_val = $.trim(field.val());
		return (field_val.length>=num);
	case "maxSize":
		var field_val = $.trim(field.val());
		return (field_val.length<=num);
	default:
		break;
	}
	return validation;
}

function _required(field){
	switch (field.prop("type")) {
		case "radio":
		case "checkbox":
			if (!field.prop('checked')) {
				return false;
			}
			break;
		case "text":
		case "password":
		case "textarea":
		case "file":
		case "select-one":
		case "select-multiple":
		default:
			var field_val      = $.trim( field.val()                               );
			var dv_placeholder = $.trim( field.attr("data-validation-placeholder") );
			var placeholder    = $.trim( field.attr("placeholder")                 );
			if (   ( !field_val                                    )
				|| ( dv_placeholder && field_val == dv_placeholder )
				|| ( placeholder    && field_val == placeholder    )
			) {
				return false;
			}
			break;
	}
	return true;
}

function _format(field,rules){
	var pattern;
	switch (rules) {
	case "email":
		pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		break;
	case "mobile":
		pattern = new RegExp(/^09[0-9]{8}$/);
		break;
	case "onlyNumberSp":
		pattern = new RegExp(/^[0-9]+$/);
		break;
	case "onlyLetterNumber":
		pattern = new RegExp(/^([0-9]+[a-zA-Z]+)|([a-zA-Z]+[0-9]+)$/);
		break;
	case "date":
		pattern = new RegExp(/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/);
		var match = pattern.exec(field.val());
		if (match == null)
		   return false;
		var year = match[1];
		var month = match[2]*1;
		var day = match[3]*1;					
		var date = new Date(year, month - 1, day); // because months starts from 0.
	
		return (date.getFullYear() == year && date.getMonth() == (month - 1) && date.getDate() == day);
	default:
		return false;
	}
	var field_val = $.trim(field.val());
	var match = pattern.exec(field.val());
	if (match == null){
		return false;
	}
	
	return true;
}