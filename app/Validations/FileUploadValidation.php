<?php

namespace App\Validations;


class FileUploadValidation
{
    public function simpleValidation($file)
    {
        $error = '';
        // Check if a file was uploaded
        if (!isset($file) || $file['error'] != UPLOAD_ERR_OK) {
            $error = 'no image file';
        }

        $allowedExtensions = ['png', 'jpg', 'jpeg'];

            // Get file extension
        $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

            // Check file extension
        if (!in_array($fileExtension, $allowedExtensions)) {
            $error = 'not allowed Extensions';
        }

        // Check file size (max 2MB)
        $maxFileSize = 500 * 1024; // 2MB in bytes
        if ($file['size'] > $maxFileSize) {
            $error = 'max file size 500kb!';
        }

            // Check if file is actually an image
        if (!getimagesize($file['tmp_name'])) {
            $error = 'not valid image!';
        }
        
        return $error;
    }

    public function renameFile($file)
    {
        $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $uniqueFileName = uniqid('img_', true) . '.' .$fileExtension;
        return $uniqueFileName;
    }

    public function simpleUpload($file, $destination)
    {
        $temp = $file['tmp_name'];
        $upload = move_uploaded_file($temp, $destination);
        if($upload){
            return true;
        }
        return false;
    }

    public function getImage($file, $dir)
    {
        return "/showImage?file=$file&dir=$dir";
    }
}
