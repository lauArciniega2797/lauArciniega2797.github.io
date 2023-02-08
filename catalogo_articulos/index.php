<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://kit.fontawesome.com/f6147cfe5f.js" crossorigin="anonymous"></script>
    <title>TEST CURRENT LOCATION</title>
</head>
<body>
 
  <button onload="getCurrentLocation()">Ubicar en el mapa</button>

  <script>
    function getCurrentLocation() {
      console.log(navigator)
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition( function(position) {
              console.log(position);
          });
      }
    }
  </script>
</body>
</html>
