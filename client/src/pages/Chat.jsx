import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link,useLocation } from 'react-router-dom';
import { Divider, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";
 
import { db} from "../firebase";
import {
    addDoc,where,getDocs,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
 
function UsersComponent(props) {
  
    const handleToggle = (username, userId) => {
        props.setReceiverData({
            username: username,
            userId: userId,
        });
 
        props.navigate(`/chat/${userId}`);
    };
    
 
    return (
        <List dense className="w-full max-w-360 rounded-2xl bg-gradient-to-t from-transparent via-transparent dark:to-gray-950">
            {props.users?.map((value, index) => {
                const labelId = `checkbox-list-secondary-label-${value.userId}`;

                if (props.currentUserId !== value.userId) {
                    return (
                        <ListItem key={value.userId} disablePadding>
                            <ListItemButton onClick={() => handleToggle(value.username, value.userId)}>
                                <ListItemAvatar>
                                    <Avatar alt={value.username} src={`${value.avatar}`} />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={value.username} />
                            </ListItemButton>
                        </ListItem>
                    );
                }

                return null; 
            })}
        </List>
    );
}
 
export default function Chat() {
    const [users, setUsers] = useState([]); 
    const [receiverData, setReceiverData] = useState(null);
    const [chatMessage, setChatMessage] = useState(""); 
    const [allMessages, setAllMessages] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const fetchUserFromFirestore = async (currentUser) => {
        try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('email', '==', currentUser.email));
          const querySnapshot = await getDocs(q);
      
          if (!querySnapshot.empty) {
            console.log('User data:', querySnapshot.docs[0].data());
            return querySnapshot.docs[0].data();
          } else {
            console.log('No such user!');
          }
        } catch (error) {
          console.error('Error fetching user', error);
        }
      };
      
      const [user, setUser] = useState(null);

        useEffect(() => {
        const fetchUser = async () => {
            const userData = await fetchUserFromFirestore(currentUser);
            setUser(userData);
        };

        fetchUser();
        }, [currentUser]);

      console.log(user)
      
 
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
            setUsers(snapshot.docs.map((doc) => doc.data()));
        });
        return unsub;
    }, []);

    useEffect(() => {
      const receiverId = location.pathname.split("/")[2]; // Extracting receiver ID from URL
      const selectedUser = users.find(user => user.userId === receiverId);
      if (selectedUser) {
          setReceiverData({
              username: selectedUser.username,
              userId: selectedUser.userId,
          });
      }
  }, [location.pathname, users]);

    useEffect(() => {
        if (receiverData) {
            const unsub = onSnapshot(
                query(
                    collection(
                        db,
                        "users",
                        user?.userId,
                        "chatUsers",
                        receiverData?.userId,
                        "messages"
                    ),
                    orderBy("timestamp")
                ),
                (snapshot) => {
                    setAllMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            messages: doc.data(),
                        }))
                    );
                }
            );
            return unsub;
        }
    }, [receiverData?.userId]);
 
    const sendMessage = async () => {
        try {
            if (user && receiverData) {
                await addDoc(
                    collection(
                        db,
                        "users",
                        user.userId,
                        "chatUsers",
                        receiverData.userId,
                        "messages"
                    ),
                    {
                        username: user.username,
                        messageUserId: user.userId,
                        message: chatMessage,
                        timestamp: new Date(),
                    }
                );
 
                await addDoc(
                    collection(
                        db,
                        "users",
                        receiverData.userId,
                        "chatUsers",
                        user.userId,
                        "messages"
                    ),
                    {
                        username: user.username,
                        messageUserId: user.userId,
                        message: chatMessage,
                        timestamp: new Date(),
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
        setChatMessage("");
    };
 
    return (
        <div className="flex flex-col lg:flex-row h-screen rounded-xl  ">
            <div className="w-full lg:w-1/5 bg-transparent lg:h-full overflow-y-scroll">
                <div className="flex items-center justify-between p-4 ">
                    <h4 className="font-bold">{user?.username}</h4>
                    <Link to="/profile" className="text-gray-800 border px-2 hover:bg-sky-300 hover:dark:bg-amber-600 rounded-2xl dark:text-white cursor-pointer font-bold">
                        My profile
                    </Link>
                </div>
                <Divider />
                
                <div className="overflow-y-scroll ">
                    <UsersComponent users={users} setReceiverData={setReceiverData} navigate={navigate} currentUserId={user?.userId} />
                </div>
            </div>
            <div className="w-full lg:w-4/5 bg-transparent lg:h-full overflow-y-scroll ">
            
                <h4 className="m-2 p-2 border-b-2 font-extrabold border-sky-400 dark:border-amber-500 bg-gradient-to-b from-transparent via-transparent dark:to-gray-950 ">{receiverData ? receiverData.username : user?.username}</h4>
                <Divider />
                <div className="bg-transparent p-5  flex flex-col flex-1 max-h-[460px] overflow-y-scroll">
                    {allMessages &&
                    allMessages.map(({ id, messages }) => (
                        <div
                            key={id}
                            className={`flex ${user?.userId === messages.messageUserId ? 'flex-row-reverse' : 'flex-row'} m-2 `}
                        ><Avatar alt={messages.username} src={users.find(u => u.userId === messages.messageUserId)?.avatar} className="mx-1" />
                            <div className={`p-2 pb-0 sm:p-3 sm:pb-0 text-lg rounded-lg ${user?.userId === messages.messageUserId ? 'rounded-bl-none' : 'rounded-br-none'} max-w-[400px] ${user?.userId === messages.messageUserId ? 'bg-sky-200 dark:bg-amber-700 text-right' : 'bg-sky-300 dark:bg-amber-600 text-left '} `}>
                                <p>{messages.message}</p>
                                <small className="text-xs text-white dark:text-black">
                                    {new Date(messages.timestamp?.seconds * 1000).toLocaleString()}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center h-12">
                    <input
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-1 ml-2 border-0 border-b border-sky-300 dark:border-amber-600 rounded-lg mt-auto bg-transparent"
                        type="text"
                        placeholder="Pošaljite poruku..."
                    />
                    <IconButton onClick={sendMessage}>
                        <SendIcon className="m-2 text-stone-500" />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}