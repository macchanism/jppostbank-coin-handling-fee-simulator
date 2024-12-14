// HTMLコンテンツを非同期で取得し、指定されたルートディレクトリとコンポーネントパスに基づいて書き込む共通関数
function fetchAndWriteContent(rootDir, componentPath) {
  $.ajax({
      url: rootDir + componentPath,
      cache: false,
      async: false,
      dataType: "html",
      success: function (html) {
          // ルートディレクトリのプレースホルダーを実際のルートディレクトリに置換
          html = html.replace(/\{\$root\}/g, rootDir);
          
          // 取得したHTMLをドキュメントに書き込む
          document.write(html);
      },
      error: function (error) {
          // エラーハンドリング: コンソールにエラーメッセージを表示
          console.error("Error fetching content:", error);
      }
  });
}

// コンソールコンポーネントを読み込み表示する関数
function displayIOConsole(rootDir) {
  // 共通関数を呼び出してコンソールコンポーネントを読み込む
  fetchAndWriteContent(rootDir, "component/ioconsole.html");
}

// インフォコンポーネントを読み込み表示する関数
function displayInfo(rootDir) {
  // 共通関数を呼び出してインフォコンポーネントを読み込む
  fetchAndWriteContent(rootDir, "component/info.html");
}
