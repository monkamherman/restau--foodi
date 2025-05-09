
import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImageUploaderProps {
  imageUrl: string;
  onImageUploaded: (url: string) => void;
}

const ImageUploader = ({ imageUrl, onImageUploaded }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(imageUrl || null);
  const [file, setFile] = useState<File | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an image to upload.",
      });
      return;
    }

    setUploading(true);
    try {
      const imageName = `${uuidv4()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("dishes")
        .upload(imageName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Construct URL manually
      const imageUrl = `https://lubfehdynarfcskleimf.supabase.co/storage/v1/object/public/dishes/${imageName}`;
      onImageUploaded(imageUrl);
      setImagePreview(imageUrl);

      toast({
        title: "Image uploaded",
        description: "Image has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error uploading image",
        description: error.message,
      });
    } finally {
      setUploading(false);
      setIsImageDialogOpen(false);
      setFile(null);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.svg']
    },
  });

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-4">
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Upload Image</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Image Upload</DialogTitle>
              <DialogDescription>
                Upload a new image from your computer.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md">
                <div 
                  {...getRootProps()}
                  className="flex flex-col items-center justify-center w-full h-40 cursor-pointer"
                >
                  <input {...getInputProps()} />
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-full max-h-full object-contain" 
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Drag 'n' drop an image here, or click to select files
                    </p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleImageUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {imagePreview && (
        <div className="mt-2">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
