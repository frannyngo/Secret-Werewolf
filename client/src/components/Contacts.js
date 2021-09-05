// import { Redirect } from "react-router-dom";
// import React, { useState, useRef } from "react";
// import { useContacts } from '../context/ContactsProvider';

// const Contacts = ({ token }) => {
//     const [ create, setCreate ] = useState(false);
//     const { createContact } = useContacts();
//     const { contacts } = useContacts();
//     const usernameReference = useRef();
    
//     const HandleSubmit = (e) => {
//         e.preventDefault();
//         createContact(usernameReference.current.value);
//         setCreate(false);
//     }

//     const Create = (e) => {
//         setCreate(true);
//     }

//     if (!token) {
//         return <Redirect to='/' />
//     }
 
//     return (
//         <>
//             { !create? 
//             <>
//                 { contacts.map(contact => {
//                     <div className='contactlist'>
//                         {contact.user}
//                     </div>
//                 })

//                 }
//                 <button className='btn btn-background-circle'
//                     onClick={Create}
//                     >
//                     Add Contact
//                 </button>
//             </>
//             :
//             <>
//                 <form className='create' onSubmit={HandleSubmit}>
//                     <label htmlFor='username'>
//                         Username
//                     </label>
//                     <input required
//                         type='text' 
//                         name='username' 
//                         id='username' 
//                         ref={usernameReference}
//                         placeholder='Enter Username'
//                         >        
//                     </input>
//                     <button 
//                     type='submit'
//                     className='btn btn-background-circle'
//                         >
//                         Add
//                     </button>
//                 </form>
//             </>
//             }
//         </>
//     )
// }

// export default Contacts;