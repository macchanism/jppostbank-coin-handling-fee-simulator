$(function(){
    const spinnerCtrl = {
        interval: null,
        target: null,
        timestamp: 0,
        cal: 0
    };

    const spinSpeed = 20; //変動スピード

    // 長押し押下時
    $('.btnspinner').on('touchstart mousedown click', function(e){
        if(spinnerCtrl.interval) return false;

        const target = $(this).data('target');
        spinnerCtrl.target = target;
        spinnerCtrl.timestamp = e.timeStamp;
        spinnerCtrl.cal = Number($(this).data('cal'));

        // クリックは単一の処理に留める
        if(e.type == 'click'){
            spinnerCal();
            resetSpinnerCtrl();
            return false;
        }

        // 長押し時の処理
        setTimeout(function(){
            // インターバル未実行中 + 長押しのイベントタイプスタンプ一致時に計算処理
            if(!spinnerCtrl.interval && spinnerCtrl.timestamp == e.timeStamp){
                spinnerCtrl.interval = setInterval(spinnerCal, spinSpeed);
            }
        }, 500);
    });

    // 長押し解除時 画面スクロールも解除に含む
    $(document).on('touchend mouseup scroll', function(){
        resetSpinnerCtrl();
    });

    // 変動計算関数
    function spinnerCal(){
        const target = $(spinnerCtrl.target);
        let num = Number(target.val());
        num += spinnerCtrl.cal;

        const maxVal = Number(target.data('max'));
        const minVal = Number(target.data('min'));

        num = Math.min(Math.max(num, minVal), maxVal);
        target.val(num);
    }

    // スピナーコントロールリセット
    function resetSpinnerCtrl(){
        clearInterval(spinnerCtrl.interval);
        spinnerCtrl.interval = null;
        spinnerCtrl.target = null;
        spinnerCtrl.timestamp = 0;
        spinnerCtrl.cal = 0;
    }
});


/*
下記サイトの上記開発者さまのソースコードを参考にしました．

Developer: のちょう(https://kinocolog.com)
from "https://kinocolog.com/spinner_btn/"
*/