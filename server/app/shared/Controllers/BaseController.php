<?php
namespace App\Shared\Controllers;

class BaseController{
   
    public function jsonResponse($response, $result) {
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');  
    }

    public function imageResponse($response, $image) {
        if ($image === null) {
           $response->getBody()->write(json_encode([
                "success" => false,
                "message" => "Image Not Found",
                "status" => 400
            ]));
            
            return $response->withHeader("Content-Type", "application/json")->withStatus(404);
        }

        $response->getBody()->write(
            file_get_contents($image['path'])
        );

        return $response
        ->withHeader(
            'Content-Type',
            $image['mimeType']
        )
        ->withHeader(
            'Content-Length',
            (string) $image['size']
        )
        ->withHeader(
            'Cache-Control',
            'public, max-age=86400'
        );
    }
}
?>