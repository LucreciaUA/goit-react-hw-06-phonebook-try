
import { useDispatch, useSelector } from 'react-redux';
import css from './contact-form.module.css'
import { nanoid } from "nanoid";
import { getContacts } from '../../redux/store/selector';
import { addContact } from '../../redux/store/contactsSlicer';


export const ContactForm = ()=>{

 const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

    
const addContacts = (e) => {
        e.preventDefault();
    
    const newContact = {
      id: nanoid(),
      name: e.target.elements.name.value,
      number: e.target.elements.number.value,      
    };
  
  

const isExisting = contacts.some((contact) =>
        { return (contact.name.toLowerCase() === newContact.name.toLowerCase() || contact.number === newContact.number) })
        
        if (!isExisting) {
  

          dispatch(addContact(newContact))


        }
        else {
            alert(`${newContact.name} is already in your contacts`)
        }
        
  e.currentTarget.reset();

  };

  
        return (<form onSubmit={addContacts}>
                <label htmlFor="name">Name</label><br />
                    <input type="text" className={css.input} name="name" id="name" required/><br />
                <label htmlFor="number">Phone</label><br />
                    <input type="tel" name="number" id="number" required /><br />
                <button type="submit" className={css.submit}>Add contact</button>
                </form>)
    
}