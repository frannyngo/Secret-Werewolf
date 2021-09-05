// import useLocalStorage from "./internalStorage";
// import { useState } from "react";
// import Contacts from "./Contacts";
// import Conversations from "./Conversations";
// import { Redirect } from "react-router-dom";
// import { useContacts } from "../context/ContactsProvider";

// const CONVERSATION_KEY = 'conversation';
// const CONTACTS_KEY = 'contacts';

// const ChatRoom = ({ token }) => {
//     const [ convoKey, setConvoKey ] = useState();
//     const [ contactKey, setContactKey ] = useState();

//     const SelectConvo = (e) => {
//         setConvoKey(CONVERSATION_KEY);
//         setContactKey(null);
//     }

//     const SelectContacts = (e) => {
//         setContactKey(CONTACTS_KEY);
//         setConvoKey(null);
//     }

//     if (!token) {
//         return <Redirect to='/' />
//     }

//     return (
//         <> 
//             <div className='chatroom'>
//                 <div className='tabs'>
//                     <button className='btn btn-background-circle'
//                         onClick={SelectConvo}
//                         >
//                         Conversations
//                     </button>
//                     <button className='btn btn-background-circle'
//                         onClick={SelectContacts}
//                         >
//                         Contacts
//                     </button>
//                 </div>
                

//                 { !convoKey && contactKey?
//                     <Contacts token={token} />
//                 :
//                     <Conversations token={token} />
//                 }

//             </div>
//         </>
//     );
// }

// export default ChatRoom;