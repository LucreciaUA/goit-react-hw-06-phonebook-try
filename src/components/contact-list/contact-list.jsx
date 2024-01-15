import React from "react"; 
import css from './contact-list.module.css'
import { nanoid } from "nanoid";
import { deleteContact } from "../../redux/store/contactsSlicer";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, getSearch } from "../../redux/store/selector";


export const ContactList = () => {
    const contacts = useSelector(getContacts)
    const search = useSelector(getSearch)
    const dispatch = useDispatch()

    const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

    const delContact = (id) => {
        dispatch(deleteContact(id))
    }


    return (
        <ul>
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact) => {
                                const { name, number } = contact;
                                return (
                                    <li key={nanoid()}>
                                         <span>{name} - {number}</span>
        
                                    <button type="button" className={css.delete} onClick={() => delContact(contact.id)}>
                                        -</button>
                                    </li>
                                );
                            })
                        ) : (
                            <p>No contacts found.</p>
                        )}
                    </ul>
    )

}