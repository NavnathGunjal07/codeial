class ChatEngine{constructor(e,s){this.chatBox=$(`#${e}`),this.userEmail=s,this.socket=io.connect("http://localhost:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets...!"),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"codeial"}),e.socket.on("user_joined",(function(e){console.log("a user joined!",e)}))})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"codeial"})})),e.socket.on("receive_message",(function(s){console.log("message received",s.message);let t=$("<li>"),o="other-message";s.user_email==e.userEmail&&(o="self-message"),t.append($("<span>",{html:s.message})),t.append($("<sub>",{html:`${s.user_email} ${moment().format("h:mm a")}`})),t.addClass(o),$("#chat-messages-list").append(t)}))}}function openForm(){document.getElementById("user-chat-box").style.display="block",document.getElementById("close-chat").style.display="block",document.getElementById("open-chat").style.display="none"}function closeForm(){document.getElementById("user-chat-box").style.display="none",document.getElementById("open-chat").style.display="block",document.getElementById("close-chat").style.display="none"}document.getElementById("close-chat").style.display="none",document.getElementById("user-chat-box").style.display="none";