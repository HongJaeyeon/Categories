
window.addEventListener("load", function(){
    let xhr = new XMLHttpRequest;
    var section1 = document.querySelector("#sec1");
    var section2 = document.querySelector("#sec2");
    var section3 = document.querySelector("#sec3");
    var noticeList = section1.querySelector(".notice-list");
    var noticeList2 = section2.querySelector(".notice-list");
    var noticeList3 = section3.querySelector(".notice-list");
    var tbodyNode = noticeList.querySelector("#sec1 tbody");
    var tbodyNode2 = noticeList2.querySelector("#sec2 tbody");
    var tbodyNode3 = noticeList3.querySelector("#sec3 tbody");
    var body = document.querySelector('body');
    xhr.open('GET', 'http://220.85.155.13:5187/categories', true);
    let categories = {};
    xhr.onload = function() {
        if(this.status === 200) {
            JSON.parse(this.responseText);
        }
        categories = (JSON.parse(this.responseText) || {}).categoryResponses || {};


        function initCategoryBodyBox(depth) {
            let arrNumber = [];
            for (let i = 0; i < 3; i++){
                arrNumber[i] = i + 1;
            }
            const itemToFind = arrNumber.find(function(item) {
                return item === parseInt(depth);
            })
            const idx = arrNumber.indexOf(itemToFind);
            if (idx > -1) arrNumber.splice(idx, 1);
            arrNumber.forEach(arrayIndex => {
                if(depth < parseInt(arrayIndex)) {
                    let targetTbodyNode = body.querySelector("#sec" + (arrayIndex) + " tbody");
                    if(targetTbodyNode.rows.length > 0) {
                        targetTbodyNode.querySelector('tr').remove();
                    }
                }
            })
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
                tds[0].textContent = targetCategories[i].categoryNo;
                tds[1].textContent = targetCategories[i].name;
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
                }
            }
        }
    };
    xhr.send();
});