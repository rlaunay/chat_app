import Styles from './SignIn.module.css';

function SignIn(props) {
    return (
        <button className={Styles.btn + ' ' + Styles.ripple} onClick={props.signIn}>Connexion avec Google</button>
    )
}

export default SignIn;