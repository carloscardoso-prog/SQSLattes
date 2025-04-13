(function($){

function Validator(o) {
  if (!o) throw new Error("parameter o must be specified");

  var self = this,
    $self = $(this),
    validator = o,
    errors = [];

  $.extend(self, {
    getField:function(p) {
      return $(":input[name=''" + p + "''], :input#" + p);
    },
    getType:function(field) {
      return field[0].type;
    },
    clear:function(field) {
      field.removeClass("inputError");
    },
    error:function(field, error) {
      field.addClass("inputError");
      field.bind({focus: function(){
        self.clear(field);
      }});
      
      errors.push(error);
    },
    required:function(field, rule, type) {
      var error = field[0].getAttribute("required");
    
      if (type == "radio" || type == "checkbox") {
        if (!field.is(":checked")) {
          self.error(field, error);
        }
      }
      
      else if (type == "select-one") {
        if (!field.val() || (field.val() && field.val().length == 0)) {
          self.error(field, error);
        }
      }
      
      else {
        if (field.val().length == 0) {
          self.error(field, error);
        }
      }
    },
    requiredif:function(field, p) {
      var input = self.getField(p),
        type = self.getType(field),
        error = field[0].getAttribute("requiredif");
        
      if (input.val().length == 0) {
        return false;
      }

      if (field.val().length == 0) {
        self.error(field, error);
      }
    },
    equal:function(field, p) {
      var input = self.getField(p),
        error = field[0].getAttribute("equal");
      
      if (field.val() != input.val()) {
        self.error(field, error);
      }
    },
    cpf:function(field, p){
      var error = field[0].getAttribute("cpf");
      
      if (!(StringUtil.isCpf(field.val()))) {
        self.error(field, error);
      }
    },
    email:function (field, p) {
      var error = field[0].getAttribute("email");
      
      if (!(StringUtil.isEmail(field.val()))) {
        self.error(field, error);
      }
    },
    date:function(field) {
      var valid = DateUtil.isValid(field.val()),
        error = field[0].getAttribute("date");
      
      if (!valid) {
        self.error(field, error);
      }
    },
    datelt:function(field, p) {
      var d1 = DateUtil.strToDate(field.val()),
        target = self.getField(p),
        d2 = (target.size() == 0) ? DateUtil.strToDate(p) : DateUtil.strToDate(target.val()),
        error = field[0].getAttribute("datelt");
      
      if (d1 >= d2) {
        self.error(field, error);
      }      
    },
    dategt:function(field, p) {
      var d1 = DateUtil.strToDate(field.val()),
        target = self.getField(p),
        d2 = (target.size() == 0) ? DateUtil.strToDate(p) : DateUtil.strToDate(target.val()),
        error = field[0].getAttribute("dategt");
      
      if (d1 <= d2) {
        self.error(field, error);
      }      
    },
    daterange:function(field, p) {
      var d1 = DateUtil.strToDate(field.val()),
        target = self.getField(p.date),
        d2 = (target.size() == 0) ? DateUtil.strToDate(p.date) : DateUtil.strToDate(target.val()),
        error = field[0].getAttribute("daterange");
        
      if (!(DateUtil.inRange(d1, d2, p.min, p.max))) {
        self.error(field, error);
      }
    },
    numberlt:function(field, p) {
      var n1 = field.val(),
        target = self.getField(p),
        n2 = (target.size() == 0) ? p : target.val(),
        error = field[0].getAttribute("numberlt");
        
      if (n1 >= n2) {
        self.error(field, error);
      }
    },
    numbergt:function(field, p) {
      var n1 = field.val(),
        target = self.getField(p),
        n2 = (target.size() == 0) ? p : target.val(),
        error = field[0].getAttribute("numbergt");
        
      if (n1 <= n2) {
        self.error(field, error);
      }    
    },
    minLength:function(field, p) {
      var value = $.trim(field.val()),
        error = field[0].getAttribute("minLength");
    
      if (value.length < p) {
        self.error(field, error);
      }
    },
    testzip:function(field, p) {

      var  error = field[0].getAttribute("zip"),
         target = self.getField(p),
         value = $.trim(field.val());



if(value.length != 9 && target.val()=="BRA") {      
        self.error(field, error);
}
    },
    validate:function() {
      errors = [];
    
      for (var i in validator) {
        var field = self.getField(i),
          type = self.getType(field),
          rules = validator[i],
          validate = field[0].getAttribute("validate");
          
        if (!validate || validate == "false") {
          continue;
        }
        
        for (var rule in rules) {
          self[rule](field, rules[rule], type);
        }
        
      }
      
      return errors;
    }
  });
  
}

window.Validator = Validator;

})(jQuery);
