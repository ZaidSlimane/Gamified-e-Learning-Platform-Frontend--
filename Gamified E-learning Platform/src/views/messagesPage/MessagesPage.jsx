import React, {useEffect, useState} from 'react';
import RootContainer from '../../utils/rootContainerModule.jsx';
import TeacherSideNavBar from '../../components/teacherSideNavBar/TeacherSideNavBar.jsx';
import ChatCard from '../../components/chatCard/ChatCard.jsx';
import './MessagesPage.css';
import TextInput from '../../components/textInput/textInput.jsx';
import PixelatdButton from '../../components/pixelatedButton/pixelatedButton.jsx';
import SideNavBar from '../../components/sideNavBar/SideNavBar.jsx';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function MessagesPage() {

    const getToken = () => {
        return localStorage.getItem('token');
    };
    const [userData, setuserData] = useState('');
    const [loggedIn, setloggedIn] = useState('');
    const [chatRooms, setChatRooms] = useState([]);
    let [currentChat, setCurrentChat] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState('');
    const [messageContent, setMessageContent] = useState(''); // New state for message content
    const navigate = useNavigate();

    async function fetchChatRooms(userId) {
        try {
            const token = getToken();
            const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/chatrooms`, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            const chatRooms = response.data;

            for (let chatRoom of chatRooms) {
                const course = await fetchCourse(chatRoom.course);
                chatRoom.imageUrl = course.imglink;
                chatRoom.participantsNumber = chatRoom.participants.length;
            }
            setCurrentChat(chatRooms[0].id)
            setChatRooms(chatRooms);
        } catch (error) {
            console.error('Error fetching chat rooms:', error);
        }
    }

    const fetchMessages = async (chatId) => {
        try {
            const token = getToken();
            const response = await axios.get(`http://127.0.0.1:8000/api/chatroom/${chatId}/messages`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const messagesWithUsernames = await Promise.all(response.data.map(async (message) => {
                const username = await fetchParticipantDetails(message.sender);
                return { ...message, username };
            }));

            setMessages(messagesWithUsernames);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };


    const handleChatOnClick = (chatId) => {
        setCurrentChat(chatId)
        fetchMessages(chatId)
    }

    async function fetchChatId(userId) {
        const token = getToken()

        const responses = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/chatId`, {
            headers: {
                Authorization: `Bearer ${token}` // Send token as bearer code
            }
        });
        const chatParticipantId = responses.data[0].id;
        console.log("asdg" + responses.data[0].id)
        setChatId(responses.data[0].id)
        return chatParticipantId;
    }

    async function checkLoggedIn() {
        try {
            const token = getToken();
            const roleResponse = await axios.get('http://127.0.0.1:8000/api/home', {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            const data = roleResponse.data;
            if (data.user.groups.length > 0) {
                setuserData(data);
                setloggedIn(true);
                fetchChatRooms(data.user.id)
                fetchChatId(data.user.id)
            } else {
                setloggedIn(false);
                navigate('/login');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.response.status === 401) {
                setloggedIn(false);
                navigate('/login');
            }
            return false;
        }
    }

    async function fetchCourse(courseId) {
        try {
            const token = getToken();
            const response = await axios.get(`http://127.0.0.1:8000/api/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, []);

    useEffect(() => {
        if (currentChat) {
            const intervalId = setInterval(() => {
                fetchMessages(currentChat);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [currentChat]);

    const handleSendMessage = async () => {
        try {
            const token = getToken();
            const messageData = {
                content: messageContent,
                room: currentChat,
                sender: chatId
            };
            await axios.post('http://127.0.0.1:8000/api/messages/', messageData, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token as bearer code
                }
            });
            setMessageContent(''); // Clear the input after sending
            fetchMessages(currentChat); // Refresh the messages list
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const fetchParticipantDetails = async (participantId) => {
        try {
            const token = getToken();
            const participantResponse = await axios.get(`http://127.0.0.1:8000/api/chat_participants/${participantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { user_id } = participantResponse.data;

            const userResponse = await axios.get(`http://127.0.0.1:8000/api/chatParticipant/${user_id}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const user = userResponse.data[0];
            return user.username;
        } catch (error) {
            console.error('Error fetching participant details:', error);
            return 'Unknown User';
        }
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const chatList = [
        {courseName: 'Course 1', imageUrl: '../../../public/img.png'},
        {courseName: 'Course 2', imageUrl: '../../../public/img.png'},
        {courseName: 'Course 3', imageUrl: '../../../public/img.png'},
    ];
    const role = localStorage.getItem('ROLE');
    console.log(role);
    return (
        <div className="root-no-right-margin root-container-full-width mb-xxl-5 messages-page">
            <RootContainer>
                {role && role === 'TEACHER' ? <TeacherSideNavBar/> : <SideNavBar/>}
                <div className="chat-container">
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={message.sender === chatId ? "message-row received-message-container" : "sent-message-container"}>
                                <div>
                                    <div className="message-sender ps-2 pe-3 pb-2 text-white">{message.username}</div>
                                    <div className="message-content" className={message.sender === chatId ? "received-message" : "sent-message"}>{message.content}</div>
                                </div>
                            </div>
                        ))}

                        <div className="d-flex ms-5 message-send-container">
                            <div className="send-button me-5 pt-1">
                                <PixelatdButton text={'SEND'} onClick={handleSendMessage} />
                            </div>
                            <TextInput value={messageContent} onChange={(e) => setMessageContent(e.target.value)} onKeyDown={handleKeyDown} />
                        </div>
                    </div>
                    <div className="chat-cards">
                        {chatRooms.map((chat, index) => (
                            <ChatCard key={index} courseName={chat.room_name} imageUrl={chat.imageUrl}
                                      participantsNumber={chat.participantsNumber}
                                      onClick={() => handleChatOnClick(chat.id)} />
                        ))}
                    </div>
                </div>
            </RootContainer>
        </div>
    );
};

export default MessagesPage;

