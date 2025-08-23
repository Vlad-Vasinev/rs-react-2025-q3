import { useState, useEffect } from 'react'
import '../src/styles/general/App.scss'

import PageWrapper from './components/pageWrapper/pageWrapper'
import Header from './components/header/header'
import Footer from './components/footer/footer'

import { UncontrolledForm } from './components/forms/uncontrolled-form'
import { ReactHookForm } from './components/forms/hook-form'
import { Modal } from './components/modal/modal'

import type { RootState } from './store'
import { useSelector } from 'react-redux'
import { fa } from 'zod/locales'

type FormType = "uncontrolled" | "react-hook-form" | null

function App() {

const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>(null);

  const detailsData = useSelector((state: RootState) => state.items.elements)
  const [details, setDetails] = useState(false)

  const [animation, setAnimation] = useState(false)

  useEffect(() => {
    setAnimation(true)
    const timer = setTimeout(() => {
      setAnimation(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [detailsData])

  function openModal(type: FormType) {
    setFormType(type);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setFormType(null);
    setDetails(false)
  }

  function handleSubmit() {
    closeModal();
    setDetails(true)
  }
  return (
    <>
      <Header></Header>
      <PageWrapper>

        <div className='btns-wrapper' data-testid="app-component">
          <button className='btn-primary' onClick={() => openModal("uncontrolled")}>Open Uncontrolled Form</button>
          {details && (
            <>
              <h2>Selected info:</h2>
              <div className={`details-wrapper ${animation ? '_animation' : ''}`}>
                <div className='details-data'>
                  <div className='details-data__item'>
                    <h3>Name:</h3>
                    <p>{detailsData.name}</p>
                  </div>
                  <div className='details-data__item'>
                    <h3>Age:</h3>
                    <p>{detailsData.age}</p>
                  </div>
                  <div className='details-data__item'>
                    <h3>Email:</h3>
                    <p>{detailsData.email}</p>
                  </div>
                  <div className='details-data__item'>
                    <h3>Password:</h3>
                    <p>{detailsData.password}</p>
                  </div>
                  <div className='details-data__item'>
                    <h3>Confirmed Password:</h3>
                    <p>{detailsData.confirmPassword}</p>
                  </div>
                  <div className='details-data__item'>
                    <h3>Gender:</h3>
                    <p>{detailsData.gender}</p>
                  </div>
                  <div className='details-data__item'>
                    <h3>AcceptTerms:</h3>
                    <p>true</p>
                  </div>
                </div>
                <img src={detailsData.picture}/>
              </div>
            </>
          )}
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

        {/* {details &&(
          <Modal onClose={closeModal}>
            <h2>Selected info:</h2>
            <div className='details-wrapper'>
              <div className='details-data'>
                <div className='details-data__item'>
                  <h3>Name:</h3>
                  <p>{detailsData.name}</p>
                </div>
                <div className='details-data__item'>
                  <h3>Age:</h3>
                  <p>{detailsData.age}</p>
                </div>
                <div className='details-data__item'>
                  <h3>Email:</h3>
                  <p>{detailsData.email}</p>
                </div>
                <div className='details-data__item'>
                  <h3>Password:</h3>
                  <p>{detailsData.password}</p>
                </div>
                <div className='details-data__item'>
                  <h3>Confirmed Password:</h3>
                  <p>{detailsData.confirmPassword}</p>
                </div>
                <div className='details-data__item'>
                  <h3>Gender:</h3>
                  <p>{detailsData.gender}</p>
                </div>
                <div className='details-data__item'>
                  <h3>AcceptTerms:</h3>
                  <p>true</p>
                </div>
              </div>
              <img src={detailsData.picture}/>
            </div>
          </Modal>
        )} */}

      </PageWrapper>
      <Footer></Footer>
    </>
  )
}

export default App
