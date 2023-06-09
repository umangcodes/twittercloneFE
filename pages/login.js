import styles from "../pages/login.module.css"
import {getProviders, signIn} from "next-auth/react"

export default function Login({providers}) {
    console.log(providers)
  return (
    <div className={styles.loginPage}>
        <div className={styles.loginMenu}>
            <div className={styles.loginTitle}>
                <h1 className="text-xl">Platform Login</h1>
                <h2>Use any authentication providers to start using the platform</h2>
            </div>
            {Object.values(providers).map(provider => (<div key={provider.id}>
                <button className={styles.loginButton} onClick={async () => {await signIn(provider.id)}}>
                    <img src={provider.name === "Google" ? "googleIcon.png" : ""} alt="google" className="h-8"/>Sign in with {provider.name}</button>
                </div>))}
        </div>
    </div>
  )
}

export async function getServerSideProps(){
    const providers = await getProviders();
    return{
        props: {providers}
    }
}