window.addEventListener("load", function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://220.85.155.13:5187/categories', true);
    xhr.onload = function() {
        if (this.status === 200) {
            categories = JSON.parse(this.responseText);
            console.log("Test:This is working");
            console.log("A",categories.categoryResponses);
        }
        //부모 메뉴 버튼 생성
        for (var i = 0; i < categories.categoryResponses.length; i++) {
            var template = document.querySelector("template"); //html의 template를 가져와 js의 template변수에 넣음
            var cloneNode = document.importNode(template.content, true); //template의 내용을 deep하게 (자손까지) 가져옴
            var button = cloneNode.querySelector("input"); //template의 내용을 받아온 cloneNode에서 button 태그를 찾음
            var menus = document.querySelector("menus"); //value값을 변경시킨 button을 append(template 밖에 노드를 추가함으로서 화면에 보이게)할 곳
            button.value = "NO." + categories.categoryResponses[i].categoryNo; //input의 value를 categories.categoryResponses[i].categoryNo으로 변경
            button.id = i;
            button.name = "parent";
            button.setAttribute("categoryno", categories.categoryResponses[i].categoryNo);
            menus.append(button);
            console.log("parent_button:",i, button);
            eval("var subList" + i + "=[]");//각자의 자식을 구분해 담기 위해 가변 변수명 사용하여 배열 만듦
        }
        //서브 메뉴 categoryNo값 리스트 생성
        for (var i = 0; i < categories.categoryResponses.length; i++) {
            for (var j = 0; j < categories.categoryResponses[i].children.length; j++) {
                eval("subList" + i + ".push(categories.categoryResponses[i].children[j].categoryNo)"); //해당 부모의 리스트에 담음
                console.log("subList0", subList0, "subList1", subList1,"subList2",subList2,"subList6",subList6);
                eval("var subsubList" + i + "=[]");
            }
        }
        //서브-서브 메뉴 categoryNo값 리스트 생성
        for (var i = 0; i < categories.categoryResponses.length; i++) {
            for (var j = 0; j < categories.categoryResponses[i].children.length; j++) {
                for (var k = 0; k < categories.categoryResponses[i].children[j].children.length; k++) {
                    eval("subsubList" + i + ".push(categories.categoryResponses[i].children[j].children[k].categoryNo)");
                    console.log("subsubList0", subsubList0,"subsubList1",subsubList1, "subsubList6", subsubList6);
                }
            }
        }
        //버튼 클릭 시 서브 메뉴 생성 및 서브-서브 버튼 생성
        menus.onclick = function (e) {
            if (e.target.tagName === "INPUT") {//menus가 다 나오는 것 거르는 조건
                console.log("e.target:",e.target);
                // //부모 메뉴 버튼 눌렀을 때
                for (var i = 0; i < categories.categoryResponses.length; i++) {
                    if (e.target.name == "parent" && e.target.id == i) {
                        for (var j = 0; j < eval("subList" + i).length; j++) {
                            var template = document.querySelector("template");
                            var cloneNode = document.importNode(template.content, true);
                            var button = cloneNode.querySelector("input");
                            button.value = "NO." + eval("subList" + i)[j];
                            button.id = j;
                            button.name = "sub";
                            button.setAttribute("categoryno", eval("subList" + i)[j]);
                            menus.append(button);

                        }
                    }
                }
                //서브 메뉴 버튼 눌렀을 때
                for (var i = 0; i < categories.categoryResponses.length; i++) {
                    for (var j = 0; j < categories.categoryResponses[i].children.length; j++) {
                        if (e.target.name == "sub" && e.target.id == j) {
                            for (var k = 0; k < eval("subsubList" + j).length; k++) {
                                var template = document.querySelector("template");
                                var cloneNode = document.importNode(template.content, true);
                                var button = cloneNode.querySelector("input");

                                button.value = "NO." + eval("subsubList" + j)[k];
                                button.id = k;
                                button.setAttribute("categoryno", eval("subList" + j)[k]);
                                menus.append(button);
                            }
                        }
                    }
                }
            }
        }
    }
    xhr.send();
});