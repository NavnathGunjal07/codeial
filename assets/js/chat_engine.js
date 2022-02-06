// import * as moment from 'moment';
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://52.90.91.122:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': `${data.user_email} ${moment().format('h:mm a')}`
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}

document.getElementById("close-chat").style.display = "none";
document.getElementById("user-chat-box").style.display = "none";
function openForm() {
    document.getElementById("user-chat-box").style.display = "block";
    document.getElementById("close-chat").style.display = "block";
    document.getElementById("open-chat").style.display = "none";
  }
  
  function closeForm() {
    document.getElementById("user-chat-box").style.display = "none";
    document.getElementById("open-chat").style.display = "block";
    document.getElementById("close-chat").style.display = "none";
  }