var LINE_NOTIFY_TOKEN = "";
var query = "";

// 条件を満たすGmail検索
function searchGmail(){
  const date = new Date();
  const unixTime = date.getTime();
  const now = Math.floor(unixTime/1000);
  const term = now - 300;
  const strTerms = 'after:'+ term;
  const myThreads = GmailApp.search(strTerms, 0, 30);
  const myMessages = GmailApp.getMessagesForThreads(myThreads);
  getGmail(myMessages);
}

// 検索したGmailのメッセージを取得
function getGmail(myMessages) {
  for(var i in myMessages){
    for(var j in myMessages[i]){
        var strDate = myMessages[i][j].getDate();
        var strmsg = Utilities.formatDate(strDate, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss')+"\n";
        strmsg += myMessages[i][j].getSubject() + "\n";
        strmsg += myMessages[i][j].getPlainBody().slice(0,200);
        sendLineMessage(strmsg);
    }
  }
}

//LINEにメッセージを送信する
function sendLineMessage(msg) {
  var headers = {
    "Authorization": "Bearer " + LINE_NOTIFY_TOKEN,
    "Content-Type": "application/json"
  };
  var data = {
    'messages': [
            {
                "type": "text",
                "text": msg,
            }
    ]
  };
  var options = {
    "headers": headers,
    "method": "post",
    "payload": JSON.stringify(data),
  };
  var response = UrlFetchApp.fetch("https://api.line.me/v2/bot/message/broadcast", options);
}
