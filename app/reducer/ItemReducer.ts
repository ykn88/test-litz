interface State {
    itemQty: number,
    totalAmount: number,
    localObject: object
}

type Action =  
  | {type: "ADD_ITEM"; itemQty: number; totalAmount: number; }
  | {type: "REDUCE_ITEM"; itemQty: number; totalAmount: number; }
  | {type: "ADD_OBJECT"; localObject: object}
  | {type: "REMOVE_OBJECT"; id: number}  

let List:Array<Object> = []
let value:number = 0

export default (state: State, action: Action) => {
    switch(action.type) {
        case "ADD_ITEM": 
            return [handleIncrement(action.itemQty)]
        case "REDUCE_ITEM": 
            return {
                ...state,
                itemQty: state.itemQty - action.itemQty, 
                totalAmount: state.totalAmount - action.totalAmount
            } 
        case "ADD_OBJECT":
            return [addObject(action.localObject)]
        case "REMOVE_OBJECT": 
            return [deleteObject(action.id)]    
    }
}

const handleIncrement = (payload:number) => {
    console.log(payload)
    value = 0
    value = payload + parseInt(window.localStorage.getItem('test'))
    console.log(value.toString())
    window.localStorage.setItem('test', (value).toString())
}

const addObject = (value: object) => {
    console.log(value)
    let flag = false
    List =  JSON.parse(window.localStorage.getItem('testCart'))
    console.log(List)
    if(List.length === 0) {
        List.push(value)
        console.log(List)
    }
    else {
        for(let j = 0; j < List.length; j++) {
            console.log(List[j])
            if(List[j].productId === value.productId) {
                List[j].qunatity = value.qunatity
                flag = true
                break
            }
        }
        if(flag === false) List.push(value)
    }
    window.localStorage.setItem('testCart', JSON.stringify(List))
}

const deleteObject = (id: number) => {
    List =  JSON.parse(window.localStorage.getItem('testCart'))
    List.filter(list => list.productId !== id)
    window.localStorage.setItem('testCart', JSON.stringify(List))
}