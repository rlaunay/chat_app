import Styles from './ChatMessage.module.css';

function ChatMessage(props) {
    const { text, uid,  photoURL} = props.message;

    const messageClass = uid === props.auth.currentUser.uid ? Styles.sent : Styles.received;

    return (
        <div className={Styles.message + ' ' + messageClass}>
            <img className={Styles.img} src={photoURL} alt="profil"/>
            <p className={Styles.text}>{text}</p>
        </div>
    );
}

export default ChatMessage;