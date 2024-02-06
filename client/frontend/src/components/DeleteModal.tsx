// import React from "react"
const DeleteModal = ({setIsOpened}:  {setIsOpened: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <main className="w-full h-full backdrop top-0 left-0">
      <section className="delete-modal">
        <p className="heading">Delete Note</p>
        <p className="">Are you sure you want to delete this note?</p>
        <div className="button-container">
          <button className="cancel-button" onClick={()=> setIsOpened(false)}>Cancel</button>
          <button className="delete-button">Delete</button>
        </div>
      </section>
    </main>
  )
}

export default DeleteModal
