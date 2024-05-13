const Group=require('../models/group');
const User = require('../models/user');

const createGroup=async(req,res)=>{

   try{ 
    const {name,description,members}=req.body


console.log(name,description,members)


const memberIds=[];

for(const memberId of members){

    const user=await User.findById(memberId)

    if(!user){
        return res.status(400).json({message:'User not Found'})
    }

    memberIds.push(user._id)

}
console.log("all",{$al:memberIds})

    // const existingGroup=await Group.findOne({name:name,members: memberIds,
    //     $where: `this.members.length === ${members.length}`});

    const existingGroup = await Group.aggregate([
        {
          $match: {
            name: name,
            members: { $all: memberIds }
          }
        },
        {
          $addFields: {
            memberCount: { $size: "$members" }
          }
        },
        {
          $match: {
            memberCount: members.length
          }
        }
      ]);

console.log("EXIX",existingGroup)

    if(existingGroup.length!==0){
        console.log("exixts")
        return res.status(400).json('Gr with same name and members exists Already !!!')
    }

    const group=new Group({
        name,
        description,
        members:memberIds
    })

    const newGroup=await group.save();

    await User.updateMany(
        {_id:{$in:memberIds}},
        {$push:{groups:newGroup._id}}
    )

    res.status(200).json(newGroup)
}
catch(error){
    console.log(error)
    res.status(500).json({error:error.message})
}



}


const getAllGroups=async(req,res)=>{

    try{

        const userId=req.params.userId;
        console.log(userId)

        const user=await User.findById(userId).populate('groups')
        console.log(user)
        // const groups=await Group.find()
        res.status(200).json(user.groups);

    }
    catch(error){
        console.log(error);
        res.status(500).json({error:error.message})
    }

}

module.exports={
    createGroup,
    getAllGroups
}