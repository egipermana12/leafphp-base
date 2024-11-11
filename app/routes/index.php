<?php

use App\Middleware\AuthMiddleware;

/*
|--------------------------------------------------------------------------
| Set up 404 handler
|--------------------------------------------------------------------------
|
| Leaf provides a default 404 page, but you can create your own
| 404 handler by uncommenting the code below. The function
| you set here will be called when a 404 error is encountered
|
*/
// app()->set404(function() {
// 	response()->page(ViewsPath("errors/404.html", false), 404);
// });

/*
|--------------------------------------------------------------------------
| Set up 500 handler
|--------------------------------------------------------------------------
|
| Leaf provides a default 500 page, but you can create your own
| 500 handler by uncommenting the code below. The function
| you set here will be called when a 500 error is encountered
|
*/
// app()->setErrorHandler(function() {
// 	response()->page(ViewsPath("errors/500.html", false), 500);
// });

/*
|--------------------------------------------------------------------------
| Set up Controller namespace
|--------------------------------------------------------------------------
|
| This allows you to directly use controller names instead of typing
| the controller namespace first.
|
*/
app()->setNamespace('\App\Controllers');

/*
|--------------------------------------------------------------------------
| Your application routes
|--------------------------------------------------------------------------
|
| Leaf MVC automatically loads all files in the routes folder that
| start with "_". We call these files route partials. An example
| partial has been created for you.
|
| If you want to manually load routes, you can
| create a file that doesn't start with "_" and manually require
| it here like so:
|
*/
// require __DIR__ . '/custom-route.php';

auth()->config([
  'GUARD_HOME' => '/dashboard',
  'GUARD_LOGIN' => '/',
]);

app()->registerMiddleware('auth_access', function() {
  $middleware = new AuthMiddleware();
  return $middleware->handle();
});

app()->get('/', 'LoginController@index');
app()->post('/', 'LoginController@login');
app()->post('/logout', 'LoginController@logout');

app()->get('/sidebar', 'ModulesController@ModuleSidebar');

app()->get('/home', 'HomeController@index');
app()->group('/dashboard', ['middleware' => 'auth_access', function() {
    app()->get('/', 'HomeController@dashboard');
}]);

app()->group('/account', ['middleware' => 'auth_access', function() {
    app()->get('/', 'HomeController@account');
    app()->post('/', 'HomeController@store');
    app()->get('/(\d+)', 'HomeController@getById');
    app()->put('/(\d+)', 'HomeController@updateById');
    app()->delete('/', 'HomeController@delete');
}]);

app()->group('/user',['middleware' => 'auth_access', function() {
  app()->get('/', 'UserController@index');
  app()->post('/', 'UserController@store');
}]);

app()->group('/anggota', ['middleware' => 'auth_access', function() {
    app()->get('/', 'AnggotaController@index');
    app()->get('/create', 'AnggotaController@create');
    app()->post('/', 'AnggotaController@store');
    app()->get('/edit/(\d+)', 'AnggotaController@edit');
    app()->patch('/', 'AnggotaController@update');
    app()->get('/apiAnggota', 'AnggotaController@daftarAnggotaApi');
    app()->get('/apiGetAnggota/(\d+)', 'AnggotaController@getAnggotaApi');
}]);

app()->group('/simpanan', ['middleware' => 'auth_access', function() {
    app()->get('/', 'SimpananController@index');
    app()->get('/create', 'SimpananController@create');
}]);

app()->group('/wilayah', ['middleware' => 'auth_access', function() {
    app()->get('/kab', 'KotakecController@getKabupaten');
    app()->get('/kec/(\d+)', 'KotakecController@getKecamatan');
    app()->get('/kel/(\d+)/(\d+)', 'KotakecController@getKelurahan');
}]);

app()->group('/showImage', ['middleware' => 'auth_access', function() {
    app()->get('/', 'ImageHelperController@showImage');
}]);
