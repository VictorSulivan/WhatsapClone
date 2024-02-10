import mongoose from "mongoose";

const Connection=()=>{
    try {
        mongoose.connect(URL, {useUnifiedTopolgy: true})
    } catch (error) {
        
    }
}