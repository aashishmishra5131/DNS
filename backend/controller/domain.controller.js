import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Domain } from "../DomainModel/Domain.model.js";

const domainData=asyncHandler(async(req,res)=>{
    const {Date,Package,Amount,Expiration_date,Status,Purchase}=req.body;

  try {
      const domain=new Domain({
          Date:Date,
          Package:Package,
          Amount:Amount,
          Expiration_date:Expiration_date,
          Status:Status,
          Purchase:Purchase
      })
      await domain.save();
      return res
      .status(201)
      .json(
          new ApiResponse(200,domain,"Data SuccessFully submit")
      )
  } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
  }
  
  })
  const getAllData=asyncHandler(async(req,res)=>{
    try {
        const data=await Domain.find()
        return res.status(200).json(data)
        
    } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
        
    }
})

const deleteData = asyncHandler(async (req, res) => {
    try {
      const { _id } = req.query; 
      const data = await Domain.findByIdAndDelete(_id);
      if (!data) {
        return res.status(404).json({ message: 'Data not found' });
      }
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  const editData=asyncHandler(async(req,res)=>{
    try {
       const {_id}=req.query;
       const newData=req.body;
       const updateData=await Domain.findByIdAndUpdate(_id,newData,{new:"true"});
       if(!updateData){
        return res.status(404).json({message:"Data not found"});
       }
       res.status(200).json({ message: 'Data updated successfully', data: updateData });

    } catch (error) {
      return res.status(500).json({message:"Internal server error"});
    }
  })

  export {domainData,getAllData,deleteData, editData};