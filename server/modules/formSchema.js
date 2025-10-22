import mongoose from "mongoose";
const formSchema =mongoose.Schema({
    fullName : { type: String, required: true },
    location: { type: String, required: true },
    skill: { type: String, required: true },
    position: { type: String, required: true },
    birth: { type: String, required: true },
    gender: { type: String, required: true },
    vision : { type: String, required: true },
    PhoneNumber :{type : Number, required : true},
    CNIC_Number :{type : Number, required : true},
    email :{type : String, require : true},
    image: {type: String}
});
export const form_Schema = mongoose.model('form_Schema',formSchema);