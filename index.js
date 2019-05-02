function print(text){
  var x=document.getElementById("debug");
  //check if div exist
  //if not create it and also add a script
  //that scrolls on bottom on every change
  if(x){
    x.innerHTML+="\n"+text;
  }else{
    let div=document.createElement("pre"),
      css="display:block;"+
      "position:fixed;"+
      "z-index:99999999;"+
      "padding:5px;"+
      "bottom:15px;"+
      "left:15px;"+
      "right:15px;"+
      "max-height:300px;"+
      "background:#333;"+
      "color:#ddd;"+
      "margin:0;";
    div.id="debug";
    div.style.cssText=css;
    div.innerHTML=text;
    document.body.appendChild(div);
    let script=document.createElement("script");
    script.type="text/javascript";
    script.innerHTML=`var x=document.getElementById("debug");
    if(window.addEventListener) {
      x.addEventListener('DOMSubtreeModified', if_changed, false);
    }
    function if_changed() {
      x.scrollTop = x.scrollHeight;
    }`;
    document.body.appendChild(script);
  }
}
//convert number to digits
function toDigit(n,p) {
  if(!p){p=2;}//convert to 2 digit by default
  let d = new Array(p+1).join("0");
  return (d + n).slice(-p);
}
//firefox solution for json stringify errors
const jsonFix = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
export function log(...get){
  let output=[];
  //for each get value check the type(so far only object requires different approach)
  //and push the value also call use console log
  let t=new Date(),
    h=toDigit(t.getHours()),
    m=toDigit(t.getMinutes()),
    s=toDigit(t.getSeconds()),
    ms=toDigit(t.getMilliseconds(),3);
  console.log(get);//eslint-disable-line
  for(let i=0;i<get.length;i++){
    if(typeof(get[i])==="object"){
      output.push(String(JSON.stringify(get[i],jsonFix())));
    }else{
      output.push(String(get[i]));
    }
  }
  print(h+":"+m+":"+s+":"+ms+" "+output.join(" "));
}
