<?php

    namespace App\Modules\Image;

    class ImageService {
        private string $imageDirectory;

        public function __construct() {
            $this->imageDirectory = __DIR__ . '/../../../public/photos/';
        }

        public function getImageByFileName(string $fileName): ?array
        {
            $fileName = basename($fileName);
            $filePath = $this->imageDirectory . $fileName;

            if (!is_file($filePath)) {
                return null;
            }
            return [
                'path' => $filePath,
                'mimeType' => \mime_content_type($filePath),
                'size' => filesize($filePath),
            ];
        }
    }
?>