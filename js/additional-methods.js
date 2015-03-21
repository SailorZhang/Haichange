$.validator.addMethod('isZipCode',function(value, element,param){
	var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
});

$.extend($.validator.messages, {
  isZipCode:'请输入正确的邮政编码'
});