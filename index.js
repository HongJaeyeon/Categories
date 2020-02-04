window.addEventListener("load", function(){
    let xhr = new XMLHttpRequest;
    var section1 = document.querySelector("#sec1");
    var section2 = document.querySelector("#sec2");
    var section3 = document.querySelector("#sec3");
    var noticeList = section1.querySelector(".notice-list");
    var noticeList2 = section2.querySelector(".notice-list");
    var noticeList3 = section3.querySelector(".notice-list");
    var body = document.querySelector('body');

    xhr.onload = function() {

        let categoires = getData();

        function getData(){
            fetch('http://220.85.155.13:5187/categories').then(function(response) {
                response.text().then(function (text) {
                    return text;
                })
            })
        }

        function initCategoryBodyBox(depth) {
            let arrNumber = [];
            for (let i = 0; i < 3; i++){
                arrNumber[i] = i + 1;
            }
            const itemToFind = arrNumber.find(function(item) {
                return item === parseInt(depth);
            });
            const idx = arrNumber.indexOf(itemToFind);
            if (idx > -1) arrNumber.splice(idx, 1);
            arrNumber.forEach(arrayIndex => {
                if(depth < parseInt(arrayIndex)) {
                    let targetTbodyNode = body.querySelector("#sec" + (arrayIndex) + " tbody");
                    if(targetTbodyNode.rows.length > 0) {
                        targetTbodyNode.querySelector('tr').remove();
                    }
                }
            });
            swapData();
        }
        function insert(targetCategories, depth) { //메뉴 넣는 함수
            initCategoryBodyBox(depth);
            var targetTbodyNode = body.querySelector("#sec" + (depth + 1) + " tbody");
            targetTbodyNode.setAttribute('depth', (depth + 1));
            for(var i=0; i<targetCategories.length; i++) {
                var cloneNode = document.importNode(thumbnailCategory.content, true);
                var tds = cloneNode.querySelectorAll("td");
                var trs =  cloneNode.querySelectorAll("tr");
                var categroyNo = targetCategories[i].categoryNo;
                trs[0].setAttribute( 'categroyNo', categroyNo);
                tds[1].textContent = targetCategories[i].categoryNo;
                tds[2].textContent = targetCategories[i].name;
                targetTbodyNode.appendChild(cloneNode);
            }
            addOnclickCategory(targetTbodyNode, (depth + 1));
        }
        insert(categories, 0);

        function recursive(category, categoryNo) {
            let k = 0;
            let len = category.length;
            for (; k < len ; k++ ) {
                let targetCategory = category[k]; //비교할 대상인 targetCategory(k가 돌아가 순차적으로 앞에서부터 찾음)
                if(targetCategory.categoryNo === categoryNo) return targetCategory;
                //k값이 돌아가면서 현재 k값에서의 categoryNO과 매개인자로 넣은 (찾고자하는) 그 categoryNO과 같은지 비교해서 같으면 해당 카테고리를 출력시킨다.
                else if(targetCategory['children']) {
                    let result =  recursive(targetCategory['children'], categoryNo);
                    //찾는다면 if문을 나가고, 못 찾으면 elseif로 들어옴. 그러면 children이 true인지 (자식이 있는지) 걸러냄
                    if (result !== false) {
                        return result; //다시 자기 자신을 호출 시켜 result 값에 넣음
                    }
                }
            }
            return false;
        }

        function addOnclickCategory(tbodyNode, depth) {
            tbodyNode.onclick = function(e) {
                if(e.target.nodeName === 'TD') {
                    var targetCategroyNo = e.target.parentElement.getAttribute('categroyNo');
                    var targetCategory = recursive(categories, parseInt(targetCategroyNo));
                    var targetDepth = e.target.closest('tbody').getAttribute('depth');
                    if(targetCategory.children.length > 0) insert(targetCategory.children, parseInt(targetDepth));
                    //자식이 있으면 insert 함수로 보내서 메뉴로 생성되게 함
                    console.log("e.target.parentElement",e.target.parentElement); //임의로 no과 name을 담도록 만든 테이블
                    console.log("targetCategory",targetCategory);  //실제로 api로 온 값을 저장한 객체
                    changeName(e.target.parentElement, targetCategory);
                }
            }
        }
    }

    function changeName(thisTd,targetCategory) { //e.target.parentElement === this
        thisTd.ondblclick = function() {

            console.log("this",this);

            var nameText = this;
            var overlay = body.querySelector('.black_overlay');
            var popup = body.querySelector('.popup');
            var btns = body.querySelector('#button');
            var pushText = body.querySelector('#pushtext');

            popup.style.display = 'block';
            overlay.style.display = 'block';

            btns.onclick = function() {
                nameText.children[2].textContent = pushText.value; //nameText는 this를 받음. this는 e.target.parentElement와 같고
                //임의로 필요한 (출력할) categoryNo, name값만 가져온게 e.target.parentElement임, nameText.children[1].textContent는 name이 있는 곳임
                popup.style.display = 'none';
                overlay.style.display = 'none';
                targetCategory.name = pushText.value; //textContent 값 뿐만 아니라 targetCategory값도 바꿔줌
                pushText.value = null; //그리고 null로 초기화 시킴

                console.log("targetCategory",targetCategory);
                console.log("categoires",categories);

                changeData();
            }
        }
    }

    function swapData() {
        var swapBtn = document.querySelector(".swap-button");
        swapBtn.onclick = function (e) {

            var checkBoxes = noticeList.querySelectorAll("input[type='checkbox']:checked"); //체크된 박스만 담아옴
            console.log("checkBoxes",checkBoxes);

            //잘못된 선택 시 알림
            if (checkBoxes.length != 2){
                alert("두 개를 선택하세요.");
                return;
            }

            //배열에 노드 넣기
            var tds = []; //체크된 두 개를 노드를 담을 빈 배열
            for (var i=0; i<checkBoxes.length; i++) {
                    tds.push(checkBoxes[i].parentElement.parentElement);//처음 parent하면 <td></td> 다음 parent하면 <tr></tr>
            }

            //노드 자리 변경
            var cloneNode = tds[0].cloneNode(true); //노드0을 복사함
            tds[1].replaceWith(cloneNode); //노드 0복사본과 노드1을 위치 바꿈
            tds[0].replaceWith(tds[1]) // 노드1을 노드0과 위치 바꿈
        }
    }

    function changeData() {
        var changeButton = document.querySelector(".change-button");
        changeButton.onclick = function (e) {

            var xhr1 = new XMLHttpRequest();

            xhr1.open("POST", "http://220.85.155.13:5187/categories");
            //GET 방식은 받아올 때, POST방식은 내가 올릴 때. 받아온 api를 수정해서 다시 올려야 하므로 같은 url 입력함.
            xhr1.setRequestHeader("Content-Type", "application/json"); // Header 설정

            let data = {categoryRequests: categories}; // 수정한 데이터들을 categoryRequests에 담아 보냄
            xhr1.send(JSON.stringify(data));
        }
    }
});
