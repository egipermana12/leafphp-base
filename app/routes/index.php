<?php

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

app()->registerMiddleware('auth', function () {
  $user = auth()->user();

  if (!$user) {
    auth()->guard('auth');
  }
});

app()->get('/', 'LoginController@index');
app()->post('/', 'LoginController@login');
app()->post('/logout', 'LoginController@logout');

app()->get('/home', 'HomeController@index');
app()->group('/dashboard', ['middleware' => 'auth', function() {
    app()->get('/', 'HomeController@dashboard');
}]);

app()->group('/account', function() {
    app()->get('/', 'HomeController@account');
    app()->post('/', 'HomeController@store');
    app()->get('/(\d+)', 'HomeController@getById');
    app()->put('/(\d+)', 'HomeController@updateById');
    app()->delete('/', 'HomeController@delete');
});

app()->group('/user', function() {
  app()->get('/', 'UserController@index');
  app()->post('/', 'UserController@store');
});
