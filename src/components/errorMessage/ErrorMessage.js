const ErrorMessage = () => {
    return(
        <img 
            src={process.env.PUBLIC_URL + '/error.gif'} 
            alt="error.gif"
            style={{width: "100%"}}/>
    );
}

export default ErrorMessage;