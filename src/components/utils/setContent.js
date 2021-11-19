import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const setContent = (process, Content, char) => {
    switch (process) {
        case 'waiting':
            return null;
            break;
        case 'loading':
            return <Spinner/>;
            break;
        case 'confirmed'://console.log(content)
            return char ? <Content char={char}/> : <Content/>;
            break;
        case 'error': 
            return <ErrorMessage/>
            break
        default:
            throw new Error('Unexpected process state')
    }
}

export default setContent;