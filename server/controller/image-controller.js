
const url =process.env.url;

export const uploadFile = async (request,response)=>{
    if(!request.file){
        return response.status(404).json("File not found");
    }

    const imageUrl = `${url}/file/${request.file.filename}`;
    return response.status(200).json(imageUrl)
}

