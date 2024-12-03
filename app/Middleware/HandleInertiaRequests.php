<?php

namespace App\Middleware;

use Leaf\Middleware;
use Leaf\Inertia;


class HandleInertiaRequests extends Middleware
{
    public function call()
    {
        Inertia::getSharedProps();
    }
}
