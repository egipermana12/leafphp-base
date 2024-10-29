<?php

namespace App\Controllers;
use \Leaf\FS;

class ImageHelperController extends \Leaf\Controller
{
    public function showImage()
    {
        $file = request()->get('file');
        $dir = request()->get('dir');
        $filePath = $dir . basename($file);
        $extension = FS::extension($filePath);
        if(!file_exists($filePath)){
            return null;
        }
        $ctype = "";
        switch( $extension ) {
            case "gif": $ctype="image/gif"; break;
            case "png": $ctype="image/png"; break;
            case "jpeg":
            case "jpg": $ctype="image/jpeg"; break;
            case "svg": $ctype="image/svg+xml"; break;
            default:
        }

        header('Content-type: ' . $ctype);
        header("Content-Length: " . filesize($filePath));
        echo readfile($filePath);
    }
}
