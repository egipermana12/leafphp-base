<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>hallo from blade view</p>

    @foreach( $data as $dt)
        <p> {{ $dt['user'] }} </p>
    @endforeach

</body>
</html>
