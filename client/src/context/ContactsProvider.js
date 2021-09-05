import React, { useContext } from 'react';
import useLocalStorage from '../components/internalStorage';

const ContactsContext = React.createContext()

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
    const [ contacts, setContacts ] = useLocalStorage('contacts', [])

    function createContact(user) {
        setContacts(previousContacts => {
            return [...previousContacts, {user}]
        });
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact}}>
            {children}
        </ContactsContext.Provider>
    )
}