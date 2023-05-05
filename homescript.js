//document.cookie="lang=-1;";
//document.cookie = "lang=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
let x=document.cookie;
console.log("cookie val:"+x);
$('[lang]').show();
if(x==""||x=="lang=0"){
  $('[lang="es"], [lang="z"]').hide();
}else if(x=="lang=1"){
  $('[lang="en"], [lang="z"]').hide();
}else if(x=="lang=2"){
  $('[lang="es"], [lang="en"]').hide();
}


$('#lang-switch').change(function () {
  var lang = $(this).val();
  $('[lang]').hide();
  switch (lang) {
    case 'en':
      document.cookie="lang=0;"; 
      $('[lang="en"]').show();
      break;
    case 'es':
      document.cookie="lang=1;";
      $('[lang="es"]').show();
      break;
    case 'z':
      document.cookie="lang=2;";
      $('[lang="z"]').show();
      break;
    default:
      if(x==""||x=="lang=0"){
        $('[lang="en"]').show();
      }else if(x=="lang=1"){
        $('[lang="es"]').show();
      }else if(x=="lang=2"){
        $('[lang="z"]').show();
      }
  }
});