import axios from "axios"

export const signupApi=async(values)=>{
    console.log(values);
    const response=await axios.post('',values);
    return response.data

}

export const signinApi=async(formData)=>{
    console.log(formData);
    const response=await axios.post('',formData);
    return response.data

}
export const restaurants=async()=>{
    const response=await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

export const signin=async(values)=>{

    const fakeToken={
        userId:'123',
        email:values.email,
        role:values.email==='admin@example.com'?'admin':'user',
    };


const token=btoa(JSON.stringify(fakeToken));
return {token};
}