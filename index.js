window.addEventListener("load", function(){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { // 요청에 대한 콜백
        if (xhr.readyState === xhr.DONE) { // 요청이 완료되면
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.responseText);
            } else {
                console.error(xhr.responseText);
            }
        }
    };

    xhr.open('GET', 'http://220.85.155.13:5187/categories', true);
    xhr.onload = function() {
        if(this.status === 200) {
            categories = JSON.parse(this.responseText);
            console.log("categories", categories);
        }
    }
    xhr.send();
});