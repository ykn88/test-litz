export {}

let List:Array<Object> = []

interface State {
    value: object
}

type ACTIONS =  
    | {type: "ADD_OBJECT"; localObject: object}
    | {type: "DELETE_OBJECT"; id: number}

export default (state:State, action:ACTIONS) => {
    switch(action.type) {
        case "ADD_OBJECT": 
            return [addObject(action.localObject)]
        case "DELETE_OBJECT":
            return [deleteObject(action.id)]    
    }
}    


const addObject = (value: object) => {
    let flag = false
    List =  JSON.parse(window.localStorage.getItem('testCart'))
    if(!List.length) {
        List.push(value)
    }
    else {
        for(let j = 0; j < List.length; j++) {
            if(List[j].productId === value.productId) {
                List[j].qunatity = value.qunatity
                flag = true
                break
            }
        }
        if(flag === false) List.push(value)
    }
}

const deleteObject = (id: number) => {
    List =  JSON.parse(window.localStorage.getItem('testCart'))
    List.filter(list => list.productId !== id)
    window.localStorage.setItem('testCart', JSON.stringify(List))
}