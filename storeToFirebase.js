const firebaseDB = {
    addToDB: (listArr)=>{
        if(typeof(listArr) == Array){
            listArr.forEach(ele => {
                var add = firebase.database().ref('todolist-6df03/'+ele.taskName).set(ele)
                add.then(
                    data=>{
                        alert("Data add to firebase")
                    }
                ).catch(
                    err=>alert("Error"+err)
                )    
            });
        } else {
            var add = firebase.database().ref('todolist-6df03/'+listArr.taskName).set(listArr)
            add.then(
                data=>{
                    alert("Data add to firebase")
                }
            ).catch(
                err=>alert("Error"+err)
            )  
        }
        
        
    },
    displayToDoList : ()=>{
        var allData = firebase.database().ref('todolist-6df03/')
        allData.on('value',(data)=>{
            if(data){
                var dbList = data.val()
                printTaskList(dbList)
                console.log(dbList, typeof(dbList))
                // return dbList 
            } else {
                return 'there is no data in the firebase'
            }
        })
    }

}

firebaseDB.displayToDoList();