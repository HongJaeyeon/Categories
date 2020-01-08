window.addEventListener("load", function(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://220.85.155.13:5187/categories', true);

    xhr.onload = function() {
        if(this.status === 200) {

            categories = JSON.parse(this.responseText);
            // console.log("categories 출력", categories.categoryResponses[1].children[0].categoryNo);

            var menu1 = document.getElementById("menu-1");
            menu1.value = categories.categoryResponses[0].categoryNo;

            var menu10 = document.getElementById("menu-10");
            menu10.value = categories.categoryResponses[0].children[0].categoryNo;

            var menu11 = document.getElementById("menu-11");
            menu11.value = categories.categoryResponses[0].children[0].children[0].categoryNo;

            var menu12 = document.getElementById("menu-12");
            menu12.value = categories.categoryResponses[1].categoryNo;

            var menu13 = document.getElementById("menu-13");
            menu13.value = categories.categoryResponses[1].children[0].categoryNo;
        }

    }
    xhr.send();

    document.getElementById("menu-1").addEventListener("click", openMenu1);
    document.getElementById("menu-12").addEventListener("click", openMenu12);
    document.getElementById("menu-10").addEventListener("click", openMenu10);

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


