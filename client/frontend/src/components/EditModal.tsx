// import React from "react"
const EditModal = ({setIsOpened}:  {setIsOpened: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
      <main className="w-full h-full backdrop top-0 left-0">
        <section className="modal">
          <p className="heading">Add Note</p>
          <form action="" className="modal-form">
            <div className="input-container">
              <label htmlFor="title">Title</label>
              <input
               type="text" 
               id="title" 
               name="title" 
               className="title-input"
              />
            </div>
            <div className="input-container">
              <label htmlFor="category">Category</label>
              <select name="category" id="category" className="category-input">
                <option value="personal">Personal</option>
                <option value="home">Home</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div className="input-cotainer description-container flex flex-col">
              <label htmlFor="content">Description(optional)</label>
              <textarea 
                name="content" 
                id="content" 
                maxLength={180} 
                cols={30} 
                rows={10}
                placeholder="Add a description... (Max 180 characters)"
                className="description-input" 
              >

              </textarea>
            </div>
            <div className="button-container">
              <button type="submit" className="cancel-button" onClick={() => setIsOpened(false)}>Cancel</button>
              <button type="button" className="add-button px-6">Edit</button>
            </div>
          </form>
        </section>
      </main>
    )
  }
  
  export default EditModal
  