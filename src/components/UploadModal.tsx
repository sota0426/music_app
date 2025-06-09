import uniqid from "uniqid"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useUploadModal from "../hooks/useUploadModal";
import Modal from "./Modal"
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal=()=>{
  const [isLoading , setIsLoading]=useState(false);
  const uploadModal = useUploadModal();
  const {user} = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  

  const {
    register,
    handleSubmit,
    reset
  }=useForm<FieldValues>({
    defaultValues:{
      author:"",
      title:"",
      song:null,
      image:null,
    }
  });

  const onChange =(open:boolean)=>{
    if(!open){
      uploadModal.onClose();
    }
  }

  const onSubmit:SubmitHandler<FieldValues>=async(values)=>{
    console.log("確認"); 

    console.log(values); 
    try{
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if(!imageFile || !songFile || !user){
        toast.error("Missing fields");
        return;
      }

      const uniqueID =uniqid();

      const {
        data:songData,
        error:songError,
      } = await supabaseClient.storage.from("songs").upload(`song-${uniqueID}`,songFile,{
        cacheControl:"3600",
        upsert:false
      });

      if(songError){
        setIsLoading(false)
        return toast.error("Failed song upload.")
      }

      const {
        data:imageData,
        error:imageError,
      } = await supabaseClient.storage.from("images").upload(`image-${uniqueID}`,imageFile,{
        cacheControl:"3600",
        upsert:false
      });

      if(imageError){
        toast.error("Failed image upload")
      }

      const {
        error:supabaseError
      }=await supabaseClient.from("songs").insert({
        user_id:user.id,
        title:values.title,
        author:values.author,
        image_path:imageData?.path,
        song_path:songData?.path
      })

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!")
      reset();
      uploadModal.onClose();

    }catch(error){
      toast.error("something went wrong")
    }finally{
      setIsLoading(false)
    }
  }


  return(
    <Modal
      title="Upload modal title"
      description="upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input 
          id="title"
          disabled={isLoading}
          {...register("title",{required:true})}
          placeholder="Song title"
        />
        <Input 
          id="author"
          disabled={isLoading}
          {...register("author",{required:true})}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">
            select a song file
          </div>
        <Input 
          id="song"
          type="file"
          disabled={isLoading}
          accept=".mp3"
          {...register("song",{required:true})}
        />
          <div className="pb-1">
            select a image 
          </div>
          <Input 
          id="image"
          type="file"
          disabled={isLoading}
          accept="image/*"
          {...register("image",{required:true})}
        />
        </div>
        <Button disabled={isLoading} type="submit">
          Create 
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal;
