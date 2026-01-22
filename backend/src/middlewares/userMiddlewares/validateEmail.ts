export const validateEmailService= (email:string):boolean | Error=>{
    // regex to check if the email is valid
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(emailRegex.test(email)===false){
        return new Error('Invalid email format');
     }
    return emailRegex.test(email);
}