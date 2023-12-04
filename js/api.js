function result(A){
    let idarr = ['result-1', 'result-5', 'result-10', 'result-50', 'result-100', 'result-500', 'result-input', 'result-deposit', 'result-per'];

    for(let i=0; i<8; i++) document.getElementById(idarr[i]).innerHTML = String(A[i]);

    document.getElementById(idarr[8]).innerHTML = String(A[8].substring(0, 5));
}
  
  
function result_error() {
    let idarr = ['result-1', 'result-5', 'result-10', 'result-50', 'result-100', 'result-500', 'result-input', 'result-deposit', 'result-per'];

    for(let i=0; i<9; i++) document.getElementById(idarr[i]).innerHTML = '-';
}


function status(mode){
    let nowlog = '';
    let element = document.getElementById('log');

    switch(mode){
        case 0:
        nowlog = '正常'; break;
        case 1:
        nowlog = '計算中...'; break;
        case 2:
        nowlog = '終了'; break;
        case -1:
        nowlog = 'エラー';
        result_error();
        break;
        default:
        nowlog = '待機中'; break;
    }
    element.innerHTML = '<p>'+nowlog+'</p>';
}

function main(){
    const url = 'http://160.251.12.126:5000/api'
    let a = document.getElementById('1yen').value;
    let b = document.getElementById('5yen').value;
    let c = document.getElementById('10yen').value;
    let d = document.getElementById('50yen').value;
    let e = document.getElementById('100yen').value;
    let f = document.getElementById('500yen').value;
    let arr = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({"1":a, "5":b, "10":c, "50":d, "100":e, "500":f}));
    request.addEventListener('load', function(){
        arr = this.responseText.split(",");
        arr[0] = arr[0].slice(1); arr[8] = arr[8].slice(0,-1);

        if(arr[0]<0){
            status(-1);
            return -1;
        }
    
        result(arr)
        status(2);
        return 0;
    });

}
