import ChatMessage from './ChatMessage/ChatMessage';
import Styles from './ChatRoom.module.css';

import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatRoom(props) {

    const [messages] = useCollectionData(props.query, {idField: 'id'});

    return (
        <>
            <div className={Styles.messages}>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={props.auth} />)}

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