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
            var cloneNode = document.importNode(template.content, true); //template의 내용을 deep하게 (자손까지) 가져옴
            var button = cloneNode.querySelector("input"); //template의 내용을 받아온 cloneNode에서 button 태그를 찾음
            var menus = document.querySelector("menus"); //value값을 변경시킨 button을 append(template 밖에 노드를 추가함으로서 화면에 보이게)할 곳
            console.log("Test:button:", button);

            button.value = "NO." + categories.categoryResponses[i].categoryNo; //input의 value를 categories.categoryResponses[i].categoryNo으로 변경
            button.id = i;
            button.setAttribute("categoryno", categories.categoryResponses[i].categoryNo);
            menus.append(button);

            eval("var subList" + i + "=[]");//각자의 자식을 구분해 담기 위해 가변 변수명 사용하여 배열 만듦
        }

        //서브 메뉴 버튼 생성
        for (var i = 0; i < categories.categoryResponses.length; i++) {
            for (var j = 0; j < categories.categoryResponses[i].children.length; j++) {
                var tmp = categories.categoryResponses[i].children[j].categoryNo; //해당 부모.해당 자식의 categoryNo 값을 임시 저장
                eval("subList" + i + ".push(tmp)"); //해당 부모의 리스트에 담음
                console.log("subList0", subList0, "subList1", subList1);
                eval("var subsubList" + j + "=[]");//각자의 자식을 구분해 담기 위해 가변 변수명 사용하여 배열 만듦
            }
        }

        //서브-서브 메뉴 버튼 생성
        for (var i = 0; i < categories.categoryResponses.length; i++) {
            for (var j = 0; j < categories.categoryResponses[i].children.length; j++) {
                for (var k = 0; k < categories.categoryResponses[i].children[j].children.length; k++) {
                    var subtmp = categories.categoryResponses[i].children[j].children[k].categoryNo;
                    eval("subsubList" + j + ".push(subtmp)");
                    console.log("subsubList0", subsubList0);
                }
            }
        }//if문 수정 - 다음 카테고리가 없을 경우 어떻게? 그냥 뛰어 넘어 버리면 무엇이 무엇의 자식 리스트인지 모르는데


        menus.onclick = function (e) {
            // console.log(e.target);

            // //부모 메뉴 버튼이 눌렸을 때
            if (e.target.tagName === "INPUT") {//menus가 다 나오는 것 거르는 조건
                // console.log(e.target.getAttribute("categoryno"));
                for (var i = 0; i < categories.categoryResponses.length; i++) {
                    if (e.target.id == i) {
                        for (var j = 0; j < eval("subList" + i).length; j++) {
                            var template = document.querySelector("template"); //html의 template를 가져와 js의 template변수에 넣음
                            var cloneNode = document.importNode(template.content, true); //template의 내용을 deep하게 (자손까지) 가져옴
                            var button = cloneNode.querySelector("input"); //template의 내용을 받아온 cloneNode에서 button 태그를 찾음
                            button.value = "NO." + eval("subList" + i)[j];
                            menus.append(button);
                            console.log("button",button);
                            button.setAttribute("categoryno", eval("subList" + i)[j]);
                        }
                    }
                }

                //서브 메뉴 버튼이 눌렸을 때
                for (var i = 0; i < categories.categoryResponses.length; i++) {
                    for (var j = 0; j < categories.categoryResponses[i].children.length; j++) {
                        if (e.target.id == j) {
                            for (var k = 0; k < eval("subsubList" + k).length; k++) {
                                var template = document.querySelector("template"); //html의 template를 가져와 js의 template변수에 넣음
                                var cloneNode = document.importNode(template.content, true); //template의 내용을 deep하게 (자손까지) 가져옴
                                var button = cloneNode.querySelector("input"); //template의 내용을 받아온 cloneNode에서 button 태그를 찾음
                                button.value = "NO." + eval("subsubList" + j)[k];
                                menus.append(button);
                                button.id = eval("1_" + k);
                                button.setAttribute("categoryno", eval("subList" + j)[k]);
                            }
                        }
                    }
                }
            }
        }
    }
    xhr.send();
});
