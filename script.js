function sum(a, b, c, d, e, f){
  if(a<0 || b<0 || c<0 || d<0 || e<0 || f<0) return -1;
  return a+5*b+10*c+50*d+100*e+500*f;
}


function commission(a, b, c, d, e, f){
  let n = a+b+c+d+e+f;
  let ret = -1;

  if(0<n && n<=25){
    ret = 110;
  }else if(n<=50){
    ret = 220;
  }else if(n<=100){
    ret = 330;
  }
  return ret;
}

/*
function deposit(a, b, c, d, e, f){
  let s = sum(a, b, c, d, e, f);
  let n = a+b+c+d+e+f;
  let com = 0;
  let ret;

  if(s<0) return -1;
  if(a<0 || b<0 || c<0 || d<0 || e<0 || f<0) return -1;

  if(0<=n && n<=25){
    com = 110;
  }else if(n<=50){
    com = 220;
  }else if(n<=100){
    com = 330;
  }else{
    return -1;
  }

  ret = s - com;
  if(ret>0) return ret;

  return -1;
}
*/

function per(a, b, c, d, e, f, _s, _cms){
  if(_s<=0 || _cms<0) return -1;
  return 100.0*_cms/_s;
}


function result(A){
  let idarr = ['result-1', 'result-5', 'result-10', 'result-50', 'result-100', 'result-500', 'result-input', 'result-deposit', 'result-per'];

  for(let i=0; i<9; i++) document.getElementById(idarr[i]).innerHTML = String(A[i]);
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
  let a = document.getElementById('1yen').value;
  let b = document.getElementById('5yen').value;
  let c = document.getElementById('10yen').value;
  let d = document.getElementById('50yen').value;
  let e = document.getElementById('100yen').value;
  let f = document.getElementById('500yen').value;

  let minper = 105.0;
  let arr = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

  for(let ai=0; ai<=Math.min(a, 100); ai++){
    for(let bi=0; bi<=Math.min(b, Math.max(0, 100-ai)); bi++){
      for(let ci=0; ci<=Math.min(c, Math.max(0, 100-ai-bi)); ci++){
        for(let di=0; di<=Math.min(d, Math.max(0, 100-ai-bi-ci)); di++){
          for(let ei=0; ei<=Math.min(e, Math.max(0, 100-ai-bi-ci-di)); ei++){
            for(let fi=0; fi<=Math.min(f, Math.max(0, 100-ai-bi-ci-di-ei)); fi++){
              status(1);
              let s = sum(ai, bi, ci, di, ei, fi);
              let cms = commission(ai, bi, ci, di, ei, fi);
              let p = per(ai, bi, ci, di, ei, fi, s, cms);
              if(p < 0.0) continue;
              if(p < minper){
                minper = p;
                arr[0]=ai;arr[1]=bi;arr[2]=ci;arr[3]=di;arr[4]=ei;arr[5]=fi;
                arr[6]=s;arr[7]=cms;arr[8]=p;
              }
            }
          }
        }
      }
    }
  }

  if(minper > 100.0 || minper < 0.0){
    status(-1);
    return -1;
  }

  result(arr);
  status(2);
  return 0;
}
