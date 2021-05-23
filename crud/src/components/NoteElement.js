export default function NoteElement(props) {
    return(
        <div className="note">
            <button onClick={() => props.handleDelete(props.id)}>&#10008;</button>
            <p>{props.content}</p>
        </div>
    );
}