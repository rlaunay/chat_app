import ChatMessage from './ChatMessage/ChatMessage';
import Styles from './ChatRoom.module.css';

function ChatRoom(props) {
    return (
        <>
            <div className={Styles.messages}>
                {props.messages && props.messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={props.auth} />)}

                <div ref={props.dummy}></div>
            </div>

            <form className={Styles.form} onSubmit={props.onSubmit} >
                <input className={Styles.input} type="text" onChange={(e) => props.onChangeFormValue(e.target.value)} value={props.formValue}/>

                <button className={Styles.submit + ' ' + Styles.ripple} type="submit" ><i className="fas fa-paper-plane"></i></button>
            </form>
        </>
    )
}

export default ChatRoom;