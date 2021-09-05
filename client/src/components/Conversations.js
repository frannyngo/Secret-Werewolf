// import { useState, useRef } from "react";
// import { Redirect } from "react-router-dom";
// import { useContacts } from '../context/ContactsProvider';

// const Conversations = ({ token }) => {
//     const [ create, setCreate ] = useState(false);
//     const { createContact } = useContacts();
//     const { contacts } = useContacts();
//     const nameReference = useRef();

//     const Submit = (e) => {
//         e.preventDefault();
//         setCreate(false);
//         createContact(nameReference.current.value);
//     }

//     const Create = (e) => {
//         setCreate(true)
//     }

//     if (!token) {
//         return <Redirect to='/' />
//     }

//     return (
// <>
//             { !create? 
//             <>
//                 {/* { contacts.map(contact => {
//                     <div className='contactlist' key={contact.id}>
//                         {contact.user}
//                     </div>
//                 })
//                 } */}
//                 <button className='btn btn-background-circle'
//                     onClick={Create}
//                     >
//                     Add Contact
//                 </button>
//             </>
//             :
//             <>
//                 <form className='create' onSubmit={Submit}>
//                     <label htmlFor='name'>
//                         Name
//                     </label>
//                     <input required
//                         type='text' 
//                         name='name' 
//                         id='name' 
//                         ref={nameReference}
//                         placeholder='Enter Name'
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
//     );
// }

// export default Conversations;