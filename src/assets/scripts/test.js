export function f(){
    console.log('module test')
}
export function f1(){
    console.log('module1 test')
}
export function f2(){
    console.log('module2 test')
}

const funcExport3 = function f3(){
    console.log('module2 test')
}

export default funcExport3;
