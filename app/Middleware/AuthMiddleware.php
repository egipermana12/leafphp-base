<?php

namespace App\Middleware;
use App\Models\UserModulsAccess;
use Leaf\Http\Response;
use Inertia\Inertia;

class AuthMiddleware {
    public function handle()
    {
        $user = auth()->user();
        if(!$user) //if not login
        {
            auth()->guard('auth');
            return;
        }
        $userId = $user['id'];
        $currentUrl = $_SERVER['REQUEST_URI'];;
        $modulName = $this->getModulFromUrl($currentUrl);
        if(!$modulName){
            // $response = new Response();
            // return $response->redirect('/dashboard');
        }

        $accessModel = new UserModulsAccess();
        $access = $accessModel->getUserAccess($userId, $modulName);   
        if(!$access || $access['access_level'] === 'disable')
        {
            // $user = auth()->status();
            // return inertia('Dashboard/Dashboard', [
            //   'user' => $user
            // ]);
        }     
    }

    private function getModulFromUrl($url)
    {
        $segments = explode('/', trim($url, '/'));
        return !empty($segments) ? $segments[0] : null;
    }
}
