import Styles from './SignOut.module.css';

function SignOut(props) {
    return props.auth.currentUser && (
        <button className={Styles.btn + ' ' + Styles.ripple} onClick={() => props.auth.signOut()}>Déconnexion</button>
    )
}

export default SignOut;