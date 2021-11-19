import img from './error.gif';

import './errorMessage.css';


const ErrorMessage = () => {
    return (
       // <img src={ProcessingInstruction.env.PUBLIC_URL + '/error.gif'}
       <img className="error-img" src={img} alt="Error img"/>
    )
}

export default ErrorMessage