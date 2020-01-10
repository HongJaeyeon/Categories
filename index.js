window.addEventListener("load", function(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://220.85.155.13:5187/categories', true);

    xhr.onload = function() {
        if (this.status === 200) {
            categories = JSON.parse(this.responseText);
            console.log("Test:This is working");
        }

        //부모 메뉴 버튼 생성
        for (var i = 0; i < categories.categoryResponses.length; i++) {
            var template = document.querySelector("template"); //html의 template를 가져와 js의 template변수에 넣음
            var cloneNode = document.importNode(template.content,true); //template의 내용을 deep하게 (자손까지) 가져옴
            console.log("Test:cloneNode:",cloneNode);
            var button = cloneNode.querySelector("input"); //template의 내용을 받아온 cloneNode에서 button 태그를 찾음
            console.log("Test:button:",button);
            button.value = "NO."+ categories.categoryResponses[i].categoryNo; //input의 value를 categories.categoryResponses[i].categoryNo으로 변경
            var menus = document.querySelector("menus"); //value값을 변경시킨 button을 append(template 밖에 노드를 추가함으로서 화면에 보이게)할 곳
            menus.append(button);
            eval ("var parentsBtn"+i+"=button");
            eval("var subList"+i+"=[]");//각자의 자식을 구분해 담기 위해 가변 변수명 사용하여 배열 만듦

        }

        //서브 메뉴 버튼 생성
        for (var i = 0; i < categories.categoryResponses.length; i++) {
            for (var j = 0; j<categories.categoryResponses[i].children.length; j++) {
                console.log("Test: i:",i,",j:",j);
                var tmp = categories.categoryResponses[i].children[j].categoryNo; //해당 부모.해당 자식의 categoryNo 값을 임시 저장
                eval("subList"+i+".push(tmp)"); //해당 부모의 리스트에 담음
                console.log("Test: subList0",subList0,"subList1",subList1);

            }
         }
        function f() {
                console.log("Test:click","parentsBtn"+i);
        }
        //
        // for (var i = 0; i < categories.categoryResponses.length; i++) {
        //     var tmpParentsBtn = eval("parentsBtn"+n);
        //     console.log("Test:tmpParentsBtn:",tmpParentsBtn);
        //
        //     tmpParentsBtn.onclick = function(){
        //         console.log("Test:click",tmpParentsBtn);
        //         // for (var m=0; m<eval("subList"+ n-1 +".length"); m++){
        //         //     button.value = "NO." + eval("subList"+i+"[m]");
        //         //     menus.append(button);
        //         }
        //     }

        // //부모 메뉴 버튼이 눌렸을 때
        // for(var n=0; n<categories.categoryResponses.length; n++){
        //     var tmpParentsBtn = eval("parentsBtn"+n);
        //     console.log("Test:tmpParentsBtn:",tmpParentsBtn);
        //     tmpParentsBtn.onclick = function(){
        //         console.log("Test:click",tmpParentsBtn);
        //         // for (var m=0; m<eval("subList"+ n-1 +".length"); m++){
        //         //     button.value = "NO." + eval("subList"+i+"[m]");
        //         //     menus.append(button);
        //         }
        //     }

        // //서브-서브 메뉴 버튼 생성
        //
        // // for (var i = 0; i < categories.categoryResponses.length; i++) {
        // //     for (var j = 0; j<categories.categoryResponses[i].children.length; j++) {
        // //         for (var k = 0; k<categories.categoryResponses[i].children[j].length; k++){
        // //             console.log("Test: i:",i,",j:",j);
        // //             var tmp = categories.categoryResponses[i].children[j].categoryNo; //해당 부모.해당 자식의 categoryNo값을 임시 저장
        // //             eval("subList"+i+".push(tmp)"); //해당 부모의 리스트에 담음
        // //             console.log("Test: subList0",subList0,"subList1",subList1);
        // //         }
        // //     }
        // }

        //서브 메뉴 버튼이 눌렸을 때

    }
    xhr.send();
});