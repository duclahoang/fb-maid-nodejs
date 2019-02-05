require('dotenv').config(); // console.log(process.env)
const simsimi = require('simsimi')({
    key: `${process.env.KEY}`,
	api: 'http://sandbox.api.simsimi.com/request.p',
	lc: 'vn',
	ft: '1.0'
});

var config = require('./config.js');
var gis = require('g-i-s');
var google = require('google');
google.resultsPerPage = 2;
var login = require('facebook-chat-api');
var list_id = [];
let MyId = "100005922573091";
var scraper = require("google-search-scraper");

var BadKW = config.BadKW;
var KW_ImageSearch = config.KW_ImageSearch;
var KW_WebSearch = config.KW_WebSearch;
var IsActive = true;
var NotChatInGroup = true;
var MaidSearch = true;
// var events = require('events');
// var emitter = new events.EventEmitter();
// var grettingHandler = function(id) {
//     console.log("greeting");
//     list_id.push(id);
//     return;
// }
// emitter.addListener("greeting",grettingHandler);

login({
    email: `${process.env.EMAIL}`,
	password: `${process.env.PASSWORD}`
},
(err,api)=> {
    if(err) return console.error(err);

    api.setOptions({
       selfListen: true
     });


    api.listen(function callback(err,message) {
      if(err) console.log(err);
      if(message.type == 'message' ) {
        // console.log(message.threadID);
        // console.log(message.senderID);
        // console.log(message.body);
        var check = list_id.includes(message.threadID);
        if(!check && message.senderID != config.MyId && IsActive) {
          console.log("greeting");
          list_id.push(message.threadID);
          api.sendMessage(config.MaidGreeting, message.threadID);
        }
        if(message.body==""&& message.senderID != config.MyId && IsActive){
          // console.log(JSON.stringify(message, null, '  '));
          // console.log(config.MaidNotUnderstand);
          if(message.senderID != config.MyId){
            api.sendMessage(config.MaidNotUnderstand + config.EmoSad, message.threadID);
            api.markAsRead(message.threadID);
          }
        }
        else {
          // console.log(message.body.slice(0,9));
          if(message.body.slice(0,KW_ImageSearch.length) == KW_ImageSearch && MaidSearch){
            kw = message.body.slice(KW_ImageSearch.length + 1)
            console.log("imagesearch: "+kw);
            if(BadKW.includes(kw)){
              msgs = config.MaidBadKWReply;
              api.sendMessage(config.MaidSelf + msgs[Math.floor(Math.random() * (msgs.length))], message.threadID);
            }
            else {
              gis(kw, (error, results)=>{
                  if(error) console.error(error);
                  let max = results.length;
                  if(max > 0)
                  {
                    if(max>config.NumOfImageSearch) max = config.NumOfImageSearch;
                    let seed = Math.floor(Math.random() * (max-1));
                    console.log(results[seed].url);
                    let msg = {body: config.MaidSelf, url: results[seed].url};
                    api.sendMessage(msg, message.threadID);
                  }
                  else api.sendMessage(config.MaidNoResult + config.EmoSad, message.threadID);
                }
              );
            }
          }
          else if(message.body.slice(0,KW_WebSearch.length) == KW_WebSearch && MaidSearch){
            kw = message.body.slice(KW_WebSearch.length + 1);
            console.log("websearch: "+kw);
            if(BadKW.includes(kw)){
              msgs = config.MaidBadKWReply;
              api.sendMessage(config.MaidSelf + msgs[Math.floor(Math.random() * (msgs.length))], message.threadID);
            }
            else {
              // let option = {
              //   query: kw,
              //   limit: 1
              // };
              // scraper.search(option, (err,url,meta) =>{
              //   if(err) console.log(err);
              //   if(typeof url !== 'undefined'){
              //     console.log(url);
              //     api.sendMessage(meta.title +"\n"+url, message.threadID);
              //   }
              //   if(url=="") api.sendMessage(config.MaidNoResult + config.EmoSad, message.threadID);

              //   // let msg = {body: config.MaidSelf, url:url};
              //   // api.sendMessage(meta.title +"\n"+url, message.threadID);
              // });
              google(kw, function (err, res){
                if (err) console.error(err);
                console.log("num of results: " +res.links.length);
                if(res.links.length != 0)
                {
                  for (var i = 0; i < res.links.length; ++i) {
                    var link = res.links[i];
                    if(link.title != '' && link.href !==null)
                    {
                      console.log(link.title + ' - ' + link.href);
                      api.sendMessage(link.title +"\n"+ link.href, message.threadID);
                    }
                  }
                }
                else api.sendMessage(config.MaidNoResult + config.EmoSad, message.threadID);
              });


            }
          }
          else if(message.body.slice(0,10)=="maid help"){
            console.log("help (normal)");
            let HelpCommand=KW_WebSearch+"/"+KW_ImageSearch+ " something...";
            api.sendMessage(config.MaidSelf +HelpCommand, message.threadID);
          }
          else
          {
            if(!(message.isGroup && NotChatInGroup)  && message.senderID != config.MyId && IsActive)
            {
              console.log("normal message");
              simsimi(message.body)
                  .then(response => {
                      api.sendMessage(`Maid-chan: ${response}`, message.threadID);
                      console.log(`Maid-chan: ${response}`);
                      api.markAsRead(message.threadID);
                  })
                  .catch(err => {
                      api.sendMessage(config.MaidHasProblem,message.threadID);
                  console.log(err);
                  }
                );
            }
            else if(message.senderID == config.MyId)
            {
              if(message.body.slice(0,4) == "maid")
              {
                console.log("command maid:");
                str = message.body.slice(5);
                console.log(str);
                if(str=="turn on"){
                  console.log("turn on");
                  IsActive=true;
                  api.sendMessage(config.MaidTurnOn, message.threadID);
                }
                else if(str=="turn off"){
                  console.log("turn off");
                  IsActive=false;
                  api.sendMessage(config.MaidTurnOff, message.threadID);
                }
                else if(str=="turn on group chat"){
                  console.log("turn on group chat");
                  NotChatInGroup=false;
                  api.sendMessage("Maid-chan: Bé Maid được nói chuyện rồi đó, nói gì với bé đi "+config.EmoHaha, message.threadID);
                }
                else if(str=="turn off group chat"){
                  console.log("turn off group chat");
                  NotChatInGroup=true;
                  api.sendMessage("Maid-chan: Bye mọi người nha !!"+config.EmoSad, message.threadID);
                }
                else if(str=="turn on group search"){
                  console.log("turn on group search");
                  MaidSearch=true;
                  api.sendMessage("Maid-chan: Bé Maid sẽ search hình ảnh và web cho mọi người "+config.EmoHaha, message.threadID);
                }
                else if(str=="turn off group search"){
                  console.log("turn off group search");
                  MaidSearch=false;
                  api.sendMessage("Maid-chan: Bé Maid bị tạm dừng hoạt động "+config.EmoSad, message.threadID);
                }
                else if(str=="HPNY all"){
                  console.log("HPNY all");
                  api.getFriendsList((err, data) => {
                      if(err) return console.error(err);
                      console.log(data.length);
                      list_except = config.HPNY_except;
                      msg = config.MaidHPNY;
                      for (var i = 0; i < data.length; i++) {
                        let id = data[i].userID;
                        if(!list_except.includes(id)){
                          api.sendMessage(msg , id);
                          console.log(data[i].userID + "-----"+ data[i].profileUrl + "-----" + data[i].fullName );
                        }
                      }
                  });
                }
                else if(str=="help master"){
                  console.log("help master");
                  let HelpCommand1=" (Only Master) maid turn on/turn off/help master, turn on/off group chat/search, set kwwebsearch/kwimagesearch/addbadkw/deletebadkw/numofimagesearch stirng";
                  api.sendMessage(config.MaidSelf +HelpCommand1 , message.threadID);
                }
                else{
                  api.sendMessage(config.MaidWrongSyntax, message.threadID);
                }
              }
              else if(message.body.slice(0,3) == "set")
              {
                console.log(message.body.slice(0,3));
                str = message.body.slice(4);
                console.log(str);
                if(str.includes("numofimagesearch")){
                  let x ="numofimagesearch ".length;
                  let substr = str.slice(x);
                  console.log(Number(substr));
                  config.setNumOfImageSearch(Number(substr));
                }
                else if(str.includes("maidself")){
                  let x ="maidself ".length;
                  let substr = str.slice(x);
                  console.log(substr);
                  config.setMaidSelf(substr);

                }
                else if(str.includes("maidgreeting")){
                  let x ="maidgreeting ".length;
                  let substr = str.slice(x);
                  console.log(substr);
                  config.setMaidGreeting(substr);
                }
                else if(str.includes("maidnotunderstand")){
                  let x ="maidnotunderstand ".length;
                  let substr = str.slice(x);
                  console.log(substr);
                  config.setMaidNotUnderstand(substr);
                }
                else if(str.includes("maidnoresult")){
                  let x ="maidnoresult ".length;
                  let substr = str.slice(x);
                  console.log(substr);
                  config.setMaidNoResult(substr);
                }
                else if(str.includes("maidhasproblem")){
                  let x ="maidhasproblem ".length;
                  let substr = str.slice(x);
                  console.log(substr);
                  config.setMaidHasProblem(substr);
                }
                else if(str.includes("kwimagesearch")){
                  let x ="kwimagesearch ".length;
                  let substr = str.slice(x);
                  console.log(substr);
                  config.setKW_ImageSearch(substr);
                }
                else if(str.includes("kwwebsearch")){
                  let x ="kwwebsearch ".length;
                  let substr = str.slice(x);
                  console.log(substr);
                  config.setKW_WebSearch(substr);
                }
                else if(str.includes("addbadkw")){
                  let x ="addbadkw ".length;
                  let substr = str.slice(x);
                  console.log(substr);
                  config.addBadKW(substr);
                }
                else if(str.includes("deletebabkw")){
                  let x ="deletebabkw ".length;
                  let substr = str.slice(x);
                  console.log(substr);
                  config.deleteBadKW(substr);
                }
                else {
                  api.sendMessage(config.MaidWrongSyntax, message.threadID);
                }
              }
            }
          }
        }
      }
      else {
        console.log(err);
      }

    });
}
);
