window.addEventListener("load", function(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://220.85.155.13:5187/categories', true);

    xhr.onload = function() {
        if (this.status === 200) {
            categories = JSON.parse(this.responseText);
            console.log("testing");
        }

    //     var section = document.querySelector('#section-menus');
    //     var menuList = section.querySelector('.menus');
    //     var tbodyNode = menuList.querySelector('tbody');
    //     var menu1 = section.querySelector('.menu-1');
    //     var menu2 = section.querySelector('.menu-2');

        // //
        // var childrenitem = [];
        // for (var i=0; i<categories.categoryResponses.length; i++){
            if categories.categoryResponses.length =0
        //     for (var j=0; j<categories.categoryResponses[i].children.length; j++) {
        //         for (var k = 0; k< categories.categoryResponses.children[i].children[j].length; k++) {
        //                      if K=0;
        //                      childrenitem.push({number: categories.categoryResponses[i].children[j].children[k].categoryNo});
        //         }
        //     }
        // }
        // console.log("childrenitem : ",childrenitem);

    //     var childrenList = [
    //         {number: categories.categoryResponses[0].children[0].categoryNo},
    //         {number: categories.categoryResponses[1].children[0].categoryNo},
    //         {number: categories.categoryResponses[0].children[0].categoryNo},
    //     ];
    //
    //     menu1.value = categories.categoryResponses[0].categoryNo;
    //     menu2.value = categories.categoryResponses[1].categoryNo;
    //
    //     menu1.onclick = function () {
    //         var trNode = menuList.querySelector('tbody tr');
    //         var cloneTrNode = trNode.cloneNode(true);
    //         var tds = cloneTrNode.querySelectorAll('td');
    //         tds[0].textContent = childrenList[0].number;
    //         tbodyNode.append(cloneTrNode);
    //         console.log("cloneTrNode1:",cloneTrNode);
    //     };
    //
    //     menu2.onclick = function () {
    //         var trNode = menuList.querySelector('tbody tr');
    //         var cloneTrNode = trNode.cloneNode(true);
    //         var tds = cloneTrNode.querySelectorAll('td');
    //
    //         tds[0].innerHTML = '<input type ="button" class="menu-13">';
    //         tbodyNode.append(cloneTrNode);
    //         var menu13 = section.querySelector('.menu-13');
    //         menu13.value = childrenList[1].number;
    //
    //         console.log("cloneTrNode2:",cloneTrNode);
    //     };
    //     console.log("childrenList:",childrenList);
    //     console.log("childrenList[0].number",childrenList[0].number);
    }
    xhr.send();
});


