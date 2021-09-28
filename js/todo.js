
const txtInput = document.querySelector(".txt-input");
const btnAdd = document.querySelector(".btn_add");
const todoList = document.querySelector(".list");
const footer = document.querySelector(".list_footer");
const tabState = document.querySelectorAll(".tab-state");
let todoListData = [];
let tabIndex = 0; // 0->全部, 1->待完成, 2->已完成

fakeAdd();
fakeAdd();
fakeAdd();
render();


btnAdd.addEventListener('click', function (e) {
    let obj = {};
    obj.content = `${txtInput.value}`;
    obj.doneStatus = false;
    todoListData.push(obj);
    txtInput.value = '';
    render();
});

tabState.forEach(function (item) {
    item.addEventListener('click', function (e) {
        tabIndex = item.getAttribute('data-index');
        cleanTabStatus(); // 讓沒被選取的tab底線消失
        item.setAttribute('class', 'tab-state active');
        render();
    });
});

todoList.addEventListener('click', function (e) {
    const tmpE = e.target;
    if (tmpE.getAttribute('class') == 'checkArea') {
        changeItemStatus(tmpE.getAttribute('data-index'));
        render();
    } else if (tmpE.getAttribute('class') == 'delete') {
        removeItem(tmpE.getAttribute('data-index'));
        render();
    }
});

footer.addEventListener('click', function (e) {
    const tmpE = e.target;
    if (tmpE.getAttribute('class') == 'cleanDone') {
        removeAllDoneItem();
        render();
    }
});


function fakeAdd() {
    let obj = {};
    obj.content = `things u need to do! (default)`;
    obj.doneStatus = false;
    todoListData.push(obj);
}

function changeItemStatus(index) {
    todoListData[index].doneStatus = !todoListData[index].doneStatus;
}

function removeItem(index) {
    todoListData.splice(index, 1);
}

function removeAllDoneItem() {
    let tmpList = [];
    todoListData.forEach(function (item) {
        if (!item.doneStatus) {
            tmpList.push(item);
        }
    });
    todoListData = tmpList;
}

function cleanTabStatus() {
    tabState.forEach(function (item) {
        item.setAttribute('class', 'tab-state');
    });
}
function render() {
    let strAll = "";
    let numAll = 0;
    let numDone = 0;

    todoListData.forEach(function (item, index) {
        numAll += 1;
        itemRendered = true; // 為true時代表此todo-item需要顯示
        if (tabIndex == 1) {
            // 待完成頁面 -> doneStatus 為 true 時 , 不顯示.
            itemRendered = item.doneStatus ? false:true;
        } else if (tabIndex == 2) {
            // 已完成頁面 -> doneStatus 為 true 時 , 顯示.
            itemRendered = item.doneStatus ? true:false;
        }

        if (itemRendered == true) {
            let str = `
        <li>
            <label class="checkbox" for="">
                <input type="checkbox" class="checkArea" data-index="${index}" ${item.doneStatus ? 'checked' : ''}/>
                <span>${item.content} </span>
            </label>
            <a href="#" class="delete" data-index="${index}" ></a>
        </li>`;
            strAll += str;
        }

        if (item.doneStatus) {
            numDone += 1;
        }
    });

    let strFooter = `                   
        ${tabIndex == 2 ? `<p>${numDone} 個已完成項目</p>` : `<p>${numAll - numDone} 個待完成項目</p>`} 
        <a href="#" class="cleanDone">清除已完成項目</a>`

    todoList.innerHTML = strAll;
    footer.innerHTML = strFooter;

};

