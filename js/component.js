function console(rootDir){
    $.ajax({
        url: rootDir + "component/console.html",
        cache: false,
        async: false,
        dataType: "html",
        success: function(html){
            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);
        }
    });
}

function info(rootDir){
    $.ajax({
        url: rootDir + "component/info.html",
        cache: false,
        async: false,
        dataType: "html",
        success: function(html){
            html = html.replace(/\{\$root\}/g, rootDir);
            document.write(html);
        }
    });
}