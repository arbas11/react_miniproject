import { React, useState, useEffect } from 'react'
import { Col } from 'reactstrap'
import Login from './login'
import RegPages from './register'
import { useNavigate } from 'react-router-dom'

const AuthPages = () => {
    const navigate = useNavigate()
    const [currentContainer, setCurrentContainer] = useState(false)

    useEffect(() => {
        let isAuth = sessionStorage.getItem('logged')
        if (isAuth) {
            navigate({ pathname: './dashboard' })
        }
    }, [navigate])

    return (
        <div className={`auth-pages`}>
            <Col md="12" lg="6">
                {
                    currentContainer ?
                        <div className={`card-register `}>
                            <RegPages setCurrentContainer={setCurrentContainer} />
                            <p className="text-center">Have an account?
                                <button className="login-link" onClick={() => setCurrentContainer(false)}>Log In</button>
                            </p>
                        </div> :
                        <div className={`card-login`}>
                            <Login setCurrentContainer={setCurrentContainer} />
                        </div>
                }
            </Col>
        </div>
    )
}

export default AuthPages;