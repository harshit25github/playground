/**
 * Notes : 
 * this behaves differently in strict and non-strict modes.
 * in strict mode there is a concept called substitution which means if this is not defined it will be undefined
 */
// this in global scope 

console.log(this); // In browsers, this will log the Window object

// this inside a function

function xyz() {
  console.log(this); // In non-strict mode, this will log the Window object; in strict mode, it will be undefined
  /**
   * 
   */
}



const obj = {
    name :'Test Object',
    getName: ()=>{
        console.log(this); // will log global object / window
    }
    ,
    objs2:{
        name:'Inner Object',
        getName:()=>{
            console.log(this); // will log global object / window   
    },

}
,
getNameNormal:function(){
    const y = ()=>{
        console.log(this); // will log objs2 object
    }
    y()
}
}


obj.getName();
obj.objs2.getName();
obj.getNameNormal();