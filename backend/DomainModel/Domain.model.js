import mongoose,{Schema} from "mongoose";

const domainSchema=new Schema({
    Date:{
        type:String,
    },
    Package:{
        type:String,
    },
    Amount:{
        type:String,
    },
    Expiration_date:{
        type:String,
    },
    Status:{
        type:String,
    },
    Purchase:{
        type:String,
    }
},{timestamps:true});

export const Domain=mongoose.model("Domain",domainSchema);
