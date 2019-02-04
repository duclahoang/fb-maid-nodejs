let MyId = "100005922573091";
let NumOfImageSearch = 10;

let MaidSelf = "Maid-chan: ";
let MaidTurnOff = "Maid-chan: Bye bye !! Gọi em lên nếu cần nhé \uD83D\uDE22 ";
let MaidWrongSyntax ="Maid-chan: Sai cú pháp rồi !!";
let MaidTurnOn = "Maid-chan: Hello, bé Maid trở lại rồi đây \uD83D\uDE06 ";
let MaidGreeting = "Maid-chan: Hiện tại anh Đức đang bận! Bạn có thể chat với bé Maid hoặc để lại lời nhắn";
let MaidNotUnderstand ="Maid-chan: Bé chỉ hiểu tin nhắn chữ";
let MaidNoResult = "Maid-chan: Em không kiếm ra kết quả";
let MaidHasProblem = "Maid-chan: Bé Maid đang gặp trục trặc";
let MaidBadWords = ["đờ mờ bạn","fuck you x 3,14"];
let BadKW = ["boobs","sex","dick","hentai","xvideos","pornhub","pussy","bậy bạ","bukkake","gangbang","gang bang","milf","step mom","step sister","anal","gay porn","ebony","threesome","creampie","deepthroat","blowjob","big ass","big tits","big tit","nipple","japan porn","japan sex","japanese sex","japanese porn","địt","chịch","xoạt","yaoi","tentacle","pregnant","sweaty","thic","dirty","suck","bbc","cock","boobs","boob","boo","vú","chim","buồi","lông","ahegao","gái gọi","đỉ","call girl","bitch"];
let MaidBadKWReply = ["Anh Đức hổng cho phép search KW này \uD83D\uDE06","Search bậy bạ quá điiiii \uD83D\uDE22","Huhu đừng bắt em search bậy nữa mà \uD83D\uDE22 !!","Dừng lại đi đồ vô học \uD83D\uDE20","Đm chụy bảo là đừng search bậy bạ nghe hông \uD83D\uDE20"];
let KW_ImageSearch ="imgsearch";
let KW_WebSearch ="websearch";
let EmoLove = "\uD83D\uDE0D";
let EmoHaha = "\uD83D\uDE06";
let EmoWow = "\uD83D\uDE2E";
let EmoSad = "\uD83D\uDE22";
let EmoAngry = "\uD83D\uDE20";
let EmoLike = "\uD83D\uDC4D";
let EmoDislike = "\uD83D\uDC4E";

let ListSetKW=["numofimagesearch","maidself","maidgreeting","maidnotunderstand","maidnoresult","maidhasproblem","kwimagesearch","kwwebsearch","addbadkw","deletebabkw"];

let HelpCommand="Only Master: maid turn on, maid turn off, maid help \n Everyone: "

let setNumOfImageSearch = function(num){
  if(num<=0 || num>100) NumOfImageSearch = 10;
  else {
    NumOfImageSearch = num;
  }
};
let setMaidSelf = function(str){
  if(str == "") MaidSelf = "Maid-chan: ";
  else {
    MaidSelf = str;
  }
};
let setMaidGreeting = function(str){
  if(str=="") MaidGreeting = "Maid-chan: Hiện tại anh Đức đang bận! Bạn có thể chat với bé Maid hoặc để lại lời nhắn";
  else MaidGreeting=str;
};
let setMaidNotUnderstand = function(str){
  if(str=="") MaidNotUnderstand ="Maid-chan: Bé chỉ hiểu tin nhắn chữ";
  else MaidNotUnderstand=str;
};
let setMaidNoResult = function(str){
  if(str=="") MaidNoResult = "Maid-chan: Em không kiếm ra kết quả";
  else MaidNoResult=str;
};
let setMaidHasProblem = function(str){
  if(str=="") MaidHasProblem = "Maid-chan: Bé Maid đang gặp trục trặc";
  else MaidHasProblem=str;
};
let setKW_ImageSearch = function(str){
  if(str=="") KW_ImageSearch = "imgsearch";
  else KW_ImageSearch=str;
};
let setKW_WebSearch = function(str){
  if(str=="") KW_WebSearch = "websearch";
  else KW_WebSearch=str;
};

let addBadKW = function(str){
  if(str=="") return;
  else BadKW.push(str);
};
let deleteBadKW = function(str){
  if(BadKW.includes(str))
  {
    for(let i = 0; i <BadKW.length; i++)
    {
      if(BadKW[i] == str) BadKW.splice(i,1);
    }
  }
};

let ConfigExport = {
  MaidTurnOff:MaidTurnOff,
  MaidTurnOn:MaidTurnOn,
  MaidWrongSyntax:MaidWrongSyntax,
  ListSetKW: ListSetKW,
  MyId: MyId,
  NumOfImageSearch: NumOfImageSearch,
  MaidSelf: MaidSelf,
  MaidGreeting: MaidGreeting,
  MaidNotUnderstand: MaidNotUnderstand,
  MaidNoResult: MaidNoResult,
  MaidHasProblem: MaidHasProblem,
  MaidBadWords: MaidBadWords,
  BadKW: BadKW,
  MaidBadKWReply: MaidBadKWReply,
  KW_ImageSearch: KW_ImageSearch,
  KW_WebSearch: KW_WebSearch,
  EmoLove: EmoLove,
  EmoHaha: EmoHaha,
  EmoWow: EmoWow,
  EmoSad: EmoSad,
  EmoAngry: EmoAngry,
  EmoLike: EmoLike,
  EmoDislike: EmoDislike,
  setNumOfImageSearch: setNumOfImageSearch,
  setMaidSelf: setMaidSelf,
  setMaidGreeting: setMaidGreeting,
  setMaidNotUnderstand: setMaidNotUnderstand,
  setMaidNoResult: setMaidNoResult,
  setMaidHasProblem: setMaidHasProblem,
  setKW_ImageSearch: setKW_ImageSearch,
  setKW_WebSearch: setKW_WebSearch,
  addBadKW: addBadKW,
  deleteBadKW: deleteBadKW
};

module.exports = ConfigExport;
