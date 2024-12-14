$(function () {
    // スピナーコントロールの型定義
    interface SpinnerCtrl {
        interval: number | null;
        target: string | null;
        timestamp: number;
        cal: number;
    }

    const spinnerCtrl: SpinnerCtrl = {
        interval: null,
        target: null,
        timestamp: 0,
        cal: 0,
    };

    const spinSpeed = 20; // 変動スピード

    // 長押し押下時
    $(".btnspinner").on("touchstart mousedown click", function (e: JQuery.TriggeredEvent) {
        if (spinnerCtrl.interval) return false;

        const target = $(this).data("target") as string;
        spinnerCtrl.target = target;
        spinnerCtrl.timestamp = e.timeStamp;
        spinnerCtrl.cal = Number($(this).data("cal"));

        // クリックは単一の処理に留める
        if (e.type === "click") {
            spinnerCal();
            resetSpinnerCtrl();
            return false;
        }

        // 長押し時の処理
        setTimeout(() => {
            // インターバル未実行中 + 長押しのイベントタイプスタンプ一致時に計算処理
            if (!spinnerCtrl.interval && spinnerCtrl.timestamp === e.timeStamp) {
                spinnerCtrl.interval = window.setInterval(spinnerCal, spinSpeed);
            }
        }, 500);
    });

    // 長押し解除時 画面スクロールも解除に含む
    $(document).on("touchend mouseup scroll", () => {
        resetSpinnerCtrl();
    });

    // 変動計算関数
    function spinnerCal(): void {
        if (!spinnerCtrl.target) return;

        const targetElement = $(spinnerCtrl.target);
        let num = Number(targetElement.val());
        num += spinnerCtrl.cal;

        const maxVal = Number(targetElement.data("max"));
        const minVal = Number(targetElement.data("min"));

        num = Math.min(Math.max(num, minVal), maxVal);
        targetElement.val(num);
    }

    // スピナーコントロールリセット
    function resetSpinnerCtrl(): void {
        if (spinnerCtrl.interval) {
            clearInterval(spinnerCtrl.interval);
        }
        spinnerCtrl.interval = null;
        spinnerCtrl.target = null;
        spinnerCtrl.timestamp = 0;
        spinnerCtrl.cal = 0;
    }
});
