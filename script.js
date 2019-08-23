// var todoListPoc = function (){

    
    var taskArr = [],
        sendToDB = []
    function addTask(){
        var tName = document.getElementById('tName').value
        var tDesc = document.getElementById('tDesc').value
        var eDate = document.getElementById('eDate').value

        var taskObj = {
            id: genID(1,100),
            taskName : tName,
            desc : tDesc,
            endDate : eDate
        }
        function genID(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        if(taskObj.taskName != "" && taskObj.desc != "" && taskObj.endDate != ""){
            
            taskArr.push(taskObj)
            console.log(taskArr)
            
            printTaskList(taskObj)
            document.getElementById('tName').value = ""
            document.getElementById('tDesc').value = ""
            document.getElementById('eDate').value = ""

        } else {
            alert('Task Detail is empty')
        }
    }

    function printTaskList(taskDetail){
        console.log(taskDetail.id)
        var viewList = document.getElementById('viewToDoList')
        var div = document.createElement('div')
        // viewList.innerText = ''
        div.className = 'border p-2 m-2'
        viewList.append(div)

        div.append(createCheckBox(taskDetail.id))
        div.append(showID(taskDetail.id))
        div.append(printTaskName(taskDetail.taskName))
        div.append(printDate(taskDetail.endDate))
        div.append(printDesc(taskDetail.desc))
        div.append(createEditBtn(taskDetail.id))
        div.append(createTrashBtn(taskDetail.id))
        
    }
    function printTaskName(taskName){
        var h2 = document.createElement('h2')
        h2.innerText = taskName
        return h2
    }
    function showID(id){
        var spanID = document.createElement('span')
        spanID.innerText = id
        return spanID
    }
    function printDesc(description){
        var p = document.createElement('p')
        p.innerText = description
        return p
    }
    function printDate(eDate){
        var span = document.createElement('span')
        span.innerText = 'End Date : ' + eDate
        return span
    }
    function createCheckBox(taskid){
        var cb = document.createElement('input')
        cb.type = 'checkbox'
        cb.setAttribute('cbId',taskid)
        var checkedID = cb.getAttribute('cbId')
        cb.setAttribute('onclick',`selectItemFromToDoList(${checkedID})`)
        return cb;
    }
    function createEditBtn(taskid){
        var edit = document.createElement('button')
        var editSpan = document.createElement('span')
        editSpan.className = 'fa fa-pencil'
        edit.className = 'btn btn-primary'
        edit.setAttribute('edit-id',taskid)
        edit.addEventListener("click",editTask)
        edit.append(editSpan)
        return edit
    }
    function createTrashBtn(taskid){
        var del = document.createElement('button')
        var delSpan = document.createElement('span')
        delSpan.className = 'fa fa-trash' 
        del.className = 'btn btn-danger ml-2'
        del.setAttribute('task-del',taskid)
        del.addEventListener("click",deleteTask)
        del.append(delSpan)
        
        return del
    }

    function editTask(){
        // var tName = document.getElementById('tName').value
        // var tDesc = document.getElementById('tDesc').value
        // var eDate = document.getElementById('eDate').value
        var taskid = this.getAttribute('edit-id')
        taskArr.forEach(ele=>{
            if(ele.id == taskid){
                document.getElementById('tName').value = ele.taskName
                document.getElementById('tDesc').value = ele.desc
                document.getElementById('eDate').value = ele.endDate
            }
        })

    }
    function updateItem() {
        // let updateListItem = editTask()
        firebaseDB.addToDB(updateListItem)
    }
    function deleteTask(){
        var taskID = this.getAttribute('task-del')
        taskArr.forEach( ele => {
            if(ele.id == taskID){
                taskArr.splice(ele,1)
                
            }
        })
        if(taskArr.length){
            taskArr.forEach(ele=>printTaskList(ele))
        }
        
    }

    function searchFromList(){
        var sBoxValue = document.getElementById('search').value
        var ddList = document.getElementById('seachBasedOn').value
        if(ddList == "taskName"){
            if(sBoxValue != ""){
                taskArr.forEach(ele=>{
                    if(sBoxValue == ele.taskName){
                        printTaskList(ele)
                    } 
                })
            }else {
                alert("Empty Search box")
            }
        } else if(ddList == "taskDate"){
            if(sBoxValue != ""){
                taskArr.forEach(ele=>{
                    if(sBoxValue == ele.endDate){
                        printTaskList(ele)
                    } 
                })
            }else {
                alert("Empty Search box")
            }
        } else if(ddList == "taskDesc"){
            if(sBoxValue != ""){
                taskArr.forEach(ele=>{
                    if(sBoxValue == ele.desc){
                        printTaskList(ele)
                    } 
                })
            }else {
                alert("Empty Search box")
            }
        }
    }

    function selectItemFromToDoList(checkedID){
        // var taskID = this.getAttribute('cbId')
        taskArr.forEach(ele=>{
            if(ele.id == checkedID){
                sendToDB.push(ele)
            }
        })
    }
    function sendToFireBase(){
        if(sendToDB.length > 0){
            firebaseDB.addToDB(sendToDB)
        }
    }
// }
