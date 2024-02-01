
export type NoteProps = {
    category: string;
    title: string;
    description: string;
    date: string;
    completed: boolean;
}

const Note = ({category, title, description, date, completed}: NoteProps) => {
  return (
    <section className="custom-card">
      <div className="flex justify-between">
          <h3 className="category-badge ${completed ? 'color' : null}">${category}</h3>
          <div className="flex items-center">
              <input type="checkbox" checked={completed} name="" id="" className="checkbox-input" />
              <button className="edit-button ${completed ? 'color' : null}"><img src="./assets/pencil.svg" alt="" /></button>
              <button className="delete-bin ${completed ? 'color' : null}"><img src="./assets/bin.svg" alt="" /></button>
          </div>
      </div>
      <p className={`task-title ${completed ? 'line-through' : null}`}>{title}</p>
      <p className={`task-description ${completed ? 'line-through' : null}`}>{description}</p>
      <p className={`task-date ${completed ? 'line-through' : null}`}>{date}</p>
    </section>
  )
}

export default Note
