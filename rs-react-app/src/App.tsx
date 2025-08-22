import { useState } from 'react'
import '../src/styles/general/App.scss'

import PageWrapper from './components/pageWrapper/pageWrapper'
import Header from './components/header/header'
import Footer from './components/footer/footer'

import { UncontrolledForm } from './components/forms/uncontrolled-form'
import { ReactHookForm } from './components/forms/hook-form'
import { Modal } from './components/modal/modal'

type FormType = "uncontrolled" | "react-hook-form" | null

function App() {

const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>(null);

  function openModal(type: FormType) {
    setFormType(type);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setFormType(null);
  }

  function handleSubmit(data: any) {
    alert(`Submitted data:\n${JSON.stringify(data, null, 2)}`);
    closeModal();
  }
  return (
    <>
      <Header></Header>
      <PageWrapper>

        <div className='btns-wrapper'>
          <button className='btn-primary' onClick={() => openModal("uncontrolled")}>Open Uncontrolled Form</button>
          <button className='btn-primary' onClick={() => openModal("react-hook-form")}>Open React-Hook Form</button>
        </div>

        {modalOpen && (
          <Modal onClose={closeModal}>
            {formType === "uncontrolled" && (
              <UncontrolledForm onSubmit={handleSubmit} />
            )}
            {formType === "react-hook-form" && (
              <ReactHookForm onSubmit={handleSubmit} />
            )}
          </Modal>
        )}

      </PageWrapper>
      <Footer></Footer>
    </>
  )
}

export default App
