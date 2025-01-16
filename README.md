## App de Reservas - Microservicios 

Para agregar un nuevo microservicio sigue los siguientes pasos:
1. Crea un proyecto de nest usando el siguiente comando y usa tu gestor de paquetes preferido (gateway y reservas usan __yarn__)
```
  nest new mesas-ms
```

2. Entra al nuevo proyecto y crea un recurso de tipo __Microservice__ 
```
    cd mesas-ms
    nest g res mesas
```

3. Con esto ya puedes implementar tu microservicio, recuerda usar la carpeta __config__ del microservicio reservas para la gestion de variables de entorno

### Agrega tu microservicio al api-gateway

1. Dentro de gateway ejecuta el siguiente comando y selecciona la opción REST API y usa los archivos indicados en el video. 
```
    cd gateway
    nest g res mesas
```
2. Configura las variables de entorno como el HOST y PORT de tu microservicio en el archivo __.env__, y el nombre del servicio en __/src/config/services.ts__
