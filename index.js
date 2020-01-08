window.addEventListener("load", function(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://220.85.155.13:5187/categories', true);
    xhr.onload = function() {
        if(this.status === 200) {
            categories = JSON.parse(this.responseText);
            console.log("categories 출력", categories);

            var list = xhr.responseText;
            console.log(typeof(list));
            console.log(list);
        }
        a = JSON.parse(this.responseText);
        console.log("ㅊㅊㅊㅊㅊ",a.categoryResponses[0].children);
    }

    xhr.send();

    document.getElementById("menu1").addEventListener("click", openMenu1);
    document.getElementById("menu12").addEventListener("click", openMenu12);
    document.getElementById("menu10").addEventListener("click", openMenu10);

    function openMenu1(){
        document.getElementById("dropdown").classList.toggle("active");
    }

    function openMenu12(){
        document.getElementById("dropdown2").classList.toggle("active");
    }

    function openMenu10(){
        document.getElementById("dropdown3").classList.toggle("active");
    }

});


