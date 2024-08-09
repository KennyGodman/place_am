import { Schema, model, models} from "mongoose";

const WaitlistSchema = new Schema({
    email:{
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    }
});

const Waitlist = models.Waitlist || model("Waitlist", WaitlistSchema);

export default Waitlist;

