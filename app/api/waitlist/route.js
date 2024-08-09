import { connectToDB } from "@utils/database";
import Waitlist from "@models/waitlist";


export const POST = async (req, res) => {
    const { email } = await req.json();
    
    try{
        await connectToDB();
        const newEmail = new Waitlist({
            email: email
        });
        
        newEmail.save();

        return new Response({
            status:201,
            message:"You have been added to the waiting list"
        })
    }catch(error){
        return new Response({
            status:500,
            error:"Failed to add you to the waiting list, TRY AGAIN LATER"
        })
    }
};

