

 onLoad =() => {
    var wsUri = "wss://ksx88f95x4.execute-api.eu-central-1.amazonaws.com/production";
    websocket = new WebSocket(wsUri);
    websocket.onopen = (evt) => onOpen(evt);
    websocket.onclose = (evt) => onClose(evt);
    websocket.onmessage = (evt) => onMessage(evt);
    websocket.onerror = (evt) => onError(evt);
 }
      
 onOpen = (evt) => {
    console.log({msg:"open success", evt});
    getStatus();
 }
      
 onClose = (evt) => {
    console.log({msg:"connection close",evt});
 }
      
 onMessage = (evt) => {
     console.log({msg: "on message", evt});
 }
      
 onError = (evt) => {
    console.log({msg: "communication error", evt})
 }

 getStatus = () => {
     console.log("get status")
     const message = {
         action: "get_status"
     }
     websocket.send(message);
 }
      
 addMessage = ()  =>{
    var message = chat.value;
    chat.value = "";
    websocket.send(message);
 }

if (window.WebSocket === undefined) {
    state.innerHTML = "sockets not supported";
    state.className = "fail";
 }else {
    if (typeof String.prototype.startsWith != "function") {
       String.prototype.startsWith = function (str) {
          return this.indexOf(str) == 0;
       };
    }
          
    window.addEventListener("load", onLoad, false);
 }