export function objToArr(obj){
    //transforms an object to an array with id of idx
    let arr =[];
    for(const [key, value]  of Object.entries(obj)){
        let x = {"text":value, id:key}
        arr.push(x); 
    }
    return arr;
}