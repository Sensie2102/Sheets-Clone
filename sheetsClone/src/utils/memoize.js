const memoArray = {};
export const memoize = (cellId, atomFactory) =>{
    if(!memoArray[cellId]){
        memoArray[cellId] = atomFactory();
    }
    
    return memoArray[cellId]
}