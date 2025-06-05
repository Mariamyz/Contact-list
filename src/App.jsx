import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { useState } from 'react'

import ContactList from './pages/ContactList/ContactList'
import AddContact from './pages/AddContact/AddContact'
import EditContact from './pages/EditContact/EditContact'
import NotFound from './pages/NotFound/NotFound'
import Header from './components/Header/Header'

function App() {
  const [stor, setStor] = useState(
    [
      {
        id: "5a17849c-2fe1-48cd-bdd1-ec8012ae5002",
        firstName: "Robert",
        lastName: "Barnabishvili",
        phone: "3902785047",
        email: "barnabirobin1@gmail.com",
        avatar: 5,
        gender: "men",
        status: "work",
        favorite: true
      },
      {
        id: "5a37849c-2fe1-48cd-bdd1-ec8012ae5002",
        firstName: "Robert",
        lastName: "Barnabishvili",
        phone: "3902785047",
        email: "barnabirobin1@gmail.com",
        avatar: 56,
        gender: "men",
        status: "work",
        favorite: true
      },
      {
        id: "5a17849c-6fe1-48cd-bdd1-ec8012ae5002",
        firstName: "Robert",
        lastName: "Barnabishvili",
        phone: "3902785047",
        email: "barnabirobin1@gmail.com",
        avatar: 8,
        gender: "men",
        status: "work",
        favorite: true
      },
    ]
  )

  const handleNewContact = (newContact) => {
    setStor(prevStor => [...prevStor, newContact])
  }

  const deleteContact = (id) => {
    setStor(prevStor => prevStor.filter(contact => contact.id !== id))
  }



  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path='/' element={<ContactList stor={stor} deleteContact={deleteContact} />} />
          <Route path='/add-contact' element={<AddContact addNewContact={handleNewContact} />} />
          <Route path='/edit-contact' element={<EditContact />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
  
}

export default App