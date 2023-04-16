const apiUrl = "http://localhost:3001";

class TaskApi{
    
    get(){

    }

    post(task){
        fetch(apiUrl + "/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
            .then((result) => result.json());       
    }

    put(){

    }

    delete(){

    }
}